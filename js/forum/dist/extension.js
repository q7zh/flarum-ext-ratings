'use strict';

System.register('q7zh/flarum-ext-ratings/main', ['flarum/app', 'flarum/extend', 'flarum/models/Discussion', 'flarum/models/Post', 'flarum/Model', 'flarum/components/HeaderPrimary', 'flarum/components/DiscussionPage', 'flarum/components/CommentPost', 'flarum/components/DiscussionComposer', 'flarum/components/EditPostComposer', 'flarum/components/ReplyComposer', 'flarum/components/TextEditor', 'flarum/components/Select', 'flarum/components/DiscussionHero', 'flarum/components/DiscussionList', 'flarum/components/DiscussionListItem'], function (_export, _context) {
    "use strict";

    var app, extend, override, Discussion, Post, Model, HeaderPrimary, DiscussionPage, CommentPost, DiscussionComposer, EditPostComposer, ReplyComposer, TextEditor, Select, DiscussionHero, DiscussionList, DiscussionListItem;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
            override = _flarumExtend.override;
        }, function (_flarumModelsDiscussion) {
            Discussion = _flarumModelsDiscussion.default;
        }, function (_flarumModelsPost) {
            Post = _flarumModelsPost.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumComponentsHeaderPrimary) {
            HeaderPrimary = _flarumComponentsHeaderPrimary.default;
        }, function (_flarumComponentsDiscussionPage) {
            DiscussionPage = _flarumComponentsDiscussionPage.default;
        }, function (_flarumComponentsCommentPost) {
            CommentPost = _flarumComponentsCommentPost.default;
        }, function (_flarumComponentsDiscussionComposer) {
            DiscussionComposer = _flarumComponentsDiscussionComposer.default;
        }, function (_flarumComponentsEditPostComposer) {
            EditPostComposer = _flarumComponentsEditPostComposer.default;
        }, function (_flarumComponentsReplyComposer) {
            ReplyComposer = _flarumComponentsReplyComposer.default;
        }, function (_flarumComponentsTextEditor) {
            TextEditor = _flarumComponentsTextEditor.default;
        }, function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }, function (_flarumComponentsDiscussionHero) {
            DiscussionHero = _flarumComponentsDiscussionHero.default;
        }, function (_flarumComponentsDiscussionList) {
            DiscussionList = _flarumComponentsDiscussionList.default;
        }, function (_flarumComponentsDiscussionListItem) {
            DiscussionListItem = _flarumComponentsDiscussionListItem.default;
        }],
        execute: function () {

            app.initializers.add('q7zh-ratings', function () {
                Discussion.prototype.ratings = Model.attribute('ratings');
                Post.prototype.ratings = Model.attribute('ratings');

                function getDefaults(index) {
                    var dbValString = app.forum.attribute('q7zh.ratings.defaults');
                    var dbVal;
                    if (dbValString === null) dbVal = [true, true, true, true];else dbVal = JSON.parse(dbValString);
                    return dbVal[index];
                }

                var q7zhRatingsOptions = {
                    'none': app.translator.trans('q7zh-ratings.forum.composer.none'),
                    'teen': app.translator.trans('q7zh-ratings.forum.composer.teen'),
                    'general': app.translator.trans('q7zh-ratings.forum.composer.general'),
                    'mature': app.translator.trans('q7zh-ratings.forum.composer.mature'),
                    'explict': app.translator.trans('q7zh-ratings.forum.composer.explict')
                };

                var q7zhRatingsShown = {
                    'general': app.translator.trans('q7zh-ratings.forum.discussion.general'),
                    'mature': app.translator.trans('q7zh-ratings.forum.discussion.mature'),
                    'explict': app.translator.trans('q7zh-ratings.forum.discussion.explict'),
                    'teen': app.translator.trans('q7zh-ratings.forum.discussion.teen'),
                    'none': app.translator.trans('q7zh-ratings.forum.composer.none')
                };

                var q7zhRatingsAvailableOptions = {};
                var q7zhRatingsAvailableShown = {};

                extend(HeaderPrimary.prototype, 'init', function () {
                    var optionKeys = Object.keys(q7zhRatingsOptions);
                    optionKeys.forEach(function (key, index) {
                        if ((index >= 4 || getDefaults(index)) && !q7zhRatingsAvailableOptions.hasOwnProperty(key)) {
                            q7zhRatingsAvailableOptions[key] = q7zhRatingsOptions[key];
                            q7zhRatingsAvailableShown[key] = q7zhRatingsShown[key];
                        }
                    });
                });

                extend(DiscussionComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.ratings = {};
                    _editor.props.ratings.options = q7zhRatingsAvailableOptions;
                    _editor.props.ratings.value = m.prop(Object.keys(q7zhRatingsAvailableOptions)[0]);
                });

                extend(EditPostComposer.prototype, 'init', function (items) {
                    var _editor = this.editor;
                    _editor.props.ratings = {};
                    _editor.props.ratings.options = q7zhRatingsAvailableOptions;
                    var ratingsKey = this.props.post.data.attributes.ratings;

                    if (!q7zhRatingsAvailableOptions.hasOwnProperty(ratingsKey)) ratingsKey = Object.keys(q7zhRatingsAvailableOptions)[0];
                    _editor.props.ratings.value = m.prop(ratingsKey);

                    if (app.current instanceof DiscussionPage) {
                        var discussionStartPost = app.current.stream.discussion.data.relationships.posts.data[0];
                        if (discussionStartPost.type == 'posts') {
                            var startPostId = discussionStartPost.id;
                            var currentPostId = this.props.post.id();
                            var isEditingStartPost = startPostId === currentPostId;
                            if (!isEditingStartPost) _editor.props.ratings.hidden = true;
                        }
                    }

                    var currentUserId = app.session.user.id();
                    var currentPostUserId = this.props.post.data.relationships.user.data.id;
                    if (currentUserId != currentPostUserId) _editor.props.ratings.hidden = true;
                });

                extend(EditPostComposer.prototype, 'data', function (data) {
                    if (this.editor.props.ratings.value()) data.ratings = this.editor.props.ratings.value();
                });

                extend(ReplyComposer.prototype, 'data', function (data) {
                    if (this.editor.props.ratings.value()) data.ratings = this.editor.props.ratings.value();
                });

                extend(DiscussionComposer.prototype, 'data', function (data) {
                    if (this.editor.props.ratings.value()) data.ratings = this.editor.props.ratings.value();
                });

                var ratingsString;
                extend(CommentPost.prototype, 'content', function (list) {
                    if (!this.isEditing()) {
                        var ratingsKey = this.props.post.data.attributes.ratings;
                        var hidden = false;

                        if (app.current instanceof DiscussionPage) {
                            var discussionStartPost = app.current.stream.discussion.data.relationships.posts.data[0];
                            if (discussionStartPost.type == 'posts') {
                                var startPostId = discussionStartPost.id;
                                var currentPostId = this.props.post.id();
                                var isEditingStartPost = startPostId === currentPostId;
                                if (!isEditingStartPost) hidden = true;
                            }
                        }

                        if (hidden) return;

                        ratingsString = q7zhRatingsAvailableShown[ratingsKey];
                    }
                });

                extend(DiscussionHero.prototype, 'items', function (items) {
                    var discussion = this.props.discussion;
                    var startPost = discussion.startPost();

                    if (startPost) {
                        var ratingsKey1 = startPost.data.attributes.ratings;
                        var ratingsString1 = q7zhRatingsAvailableShown[ratingsKey1];
                    } else var ratingsString1 = ratingsString;

                    var choice = m('div', { className: 'extra' }, ratingsString1);
                    items.add('choice', choice, 0);
                });

                extend(TextEditor.prototype, 'controlItems', function (items) {
                    var _editor = this;
                    var addDropdown = true;

                    if (!_editor.props.ratings) {
                        _editor.props.ratings = {};
                        _editor.props.ratings.options = q7zhRatingsAvailableOptions;
                        _editor.props.ratings.value = m.prop('none');
                        _editor.props.ratings.hidden = true;
                    }

                    if (_editor.props.ratings.hidden) return;

                    var dropdown = Select.component({
                        options: _editor.props.ratings.options,
                        onchange: _editor.props.ratings.value,
                        value: _editor.props.ratings.value() || Object.keys(q7zhRatingsAvailableOptions)[0]
                    });

                    items.add('q7zh-ratings-selector', dropdown, 0);
                });
            });
        }
    };
});