import app from 'flarum/app';
import { extend, override } from 'flarum/extend';
import Discussion from 'flarum/models/Discussion';
import Post from 'flarum/models/Post';
import Model from 'flarum/Model';
import HeaderPrimary from 'flarum/components/HeaderPrimary';
import DiscussionPage from 'flarum/components/DiscussionPage';
import CommentPost from 'flarum/components/CommentPost';
import DiscussionComposer from 'flarum/components/DiscussionComposer';
import EditPostComposer from "flarum/components/EditPostComposer";
import ReplyComposer from "flarum/components/ReplyComposer";
import TextEditor from "flarum/components/TextEditor";
import Select from 'flarum/components/Select';
import DiscussionHero from 'flarum/components/DiscussionHero';
import DiscussionList from 'flarum/components/DiscussionList';
import DiscussionListItem from 'flarum/components/DiscussionListItem';

app.initializers.add('q7zh-ratings', function() {
	Discussion.prototype.ratings = Model.attribute('ratings');
    Post.prototype.ratings = Model.attribute('ratings');

	function getDefaults(index) {
        var dbValString = app.forum.attribute('q7zh.ratings.defaults');
        var dbVal;
        if (dbValString === null)
            dbVal = [true, true, true, true];
        else
            dbVal = JSON.parse(dbValString);
        return dbVal[index];
    }

    const q7zhRatingsOptions = {
        'none': app.translator.trans('q7zh-ratings.forum.composer.none'),  
        'general': app.translator.trans('q7zh-ratings.forum.composer.general'),
        'teen': app.translator.trans('q7zh-ratings.forum.composer.teen'),
        'mature': app.translator.trans('q7zh-ratings.forum.composer.mature'),
        'explict': app.translator.trans('q7zh-ratings.forum.composer.explict'),   
    };

    const q7zhRatingsShown = {
        'general': app.translator.trans('q7zh-ratings.forum.discussion.general'),
        'mature': app.translator.trans('q7zh-ratings.forum.discussion.mature'),
        'explict': app.translator.trans('q7zh-ratings.forum.discussion.explict'),
        'teen': app.translator.trans('q7zh-ratings.forum.discussion.teen'),
        'none': app.translator.trans('q7zh-ratings.forum.composer.none'),
    };

    var q7zhRatingsAvailableOptions = {};
    var q7zhRatingsAvailableShown = {};

    extend(HeaderPrimary.prototype, 'init', function () {
    	var optionKeys = Object.keys(q7zhRatingsOptions);
        optionKeys.forEach(function(key, index) {
            if ((index >= 4 || getDefaults(index)) && !q7zhRatingsAvailableOptions.hasOwnProperty(key)) {
                q7zhRatingsAvailableOptions[key] = q7zhRatingsOptions[key];
                q7zhRatingsAvailableShown[key] = q7zhRatingsShown[key];
            }
        });
    });

    extend(DiscussionComposer.prototype, 'init', function (items) {
        const _editor = this.editor;
        _editor.props.ratings = {};
        _editor.props.ratings.options = q7zhRatingsAvailableOptions;
        _editor.props.ratings.value = m.prop(Object.keys(q7zhRatingsAvailableOptions)[0]);
    });

    extend(EditPostComposer.prototype, 'init', function (items) {
        const _editor = this.editor;
        _editor.props.ratings = {};
        _editor.props.ratings.options = q7zhRatingsAvailableOptions;
        let ratingsKey = this.props.post.data.attributes.ratings;

        if (!q7zhRatingsAvailableOptions.hasOwnProperty(ratingsKey))
            ratingsKey = Object.keys(q7zhRatingsAvailableOptions)[0];
        _editor.props.ratings.value = m.prop(ratingsKey);

        if (app.current instanceof DiscussionPage) {
            let discussionStartPost = app.current.stream.discussion.data.relationships.posts.data[0];
            if (discussionStartPost.type == 'posts') {
                let startPostId = discussionStartPost.id;
                let currentPostId = this.props.post.id();
                let isEditingStartPost = startPostId === currentPostId;
                if (!isEditingStartPost)
                    _editor.props.ratings.hidden = true;
            }
        }

        let currentUserId = app.session.user.id();
        let currentPostUserId = this.props.post.data.relationships.user.data.id;
        if (currentUserId != currentPostUserId)
            _editor.props.ratings.hidden = true;
    });

    extend(EditPostComposer.prototype, 'data', function(data) {
        if (this.editor.props.ratings.value())
            data.ratings = this.editor.props.ratings.value();
    });

    extend(ReplyComposer.prototype, 'data', function(data) {
        if (this.editor.props.ratings.value())
            data.ratings = this.editor.props.ratings.value();
    });

    extend(DiscussionComposer.prototype, 'data', function(data) {
        if (this.editor.props.ratings.value())
            data.ratings = this.editor.props.ratings.value();
    });

    var ratingsString;
    extend(CommentPost.prototype, 'content', function (list) {
        if (!this.isEditing()) {
            var ratingsKey = this.props.post.data.attributes.ratings;
            let hidden = false;

            if (app.current instanceof DiscussionPage) {
                let discussionStartPost = app.current.stream.discussion.data.relationships.posts.data[0];
                if (discussionStartPost.type == 'posts') {
                    let startPostId = discussionStartPost.id;
                    let currentPostId = this.props.post.id();
                    let isEditingStartPost = startPostId === currentPostId;
                    if (!isEditingStartPost)
                        hidden = true;
                }
            }

            if (hidden)
                return;

            ratingsString = q7zhRatingsAvailableShown[ratingsKey];

        }
    });

    extend(DiscussionHero.prototype, 'items', function (items) {
        const discussion = this.props.discussion;
        const startPost = discussion.startPost();

        if (startPost) {
            var ratingsKey1 = startPost.data.attributes.ratings;
            var ratingsString1 = q7zhRatingsAvailableShown[ratingsKey1];
        }
        else 
            var ratingsString1 = ratingsString;

        var choice = m('div', {className: 'extra'}, ratingsString1); 
        items.add('choice', choice, 0);
    });

    extend(TextEditor.prototype, 'controlItems', function (items) {
    	const _editor = this;
        let addDropdown = true;

        if (!_editor.props.ratings) {
            _editor.props.ratings = {};
            _editor.props.ratings.options = q7zhRatingsAvailableOptions;
            _editor.props.ratings.value = m.prop('none');
            _editor.props.ratings.hidden = true;
        }

        if (_editor.props.ratings.hidden)
            return;

        var dropdown = Select.component({
            options: _editor.props.ratings.options,
            onchange: _editor.props.ratings.value,
            value: _editor.props.ratings.value() || Object.keys(q7zhRatingsAvailableOptions)[0]
        });

        items.add('q7zh-ratings-selector', dropdown, 0);
    });

});

    