'use strict';

System.register('q7zh/flarum-ext-ratings/components/RatingsSettingsModal', ['flarum/components/SettingsModal', 'flarum/components/Switch', 'flarum/app'], function (_export, _context) {
    "use strict";

    var SettingsModal, Switch, app, RatingsSettingsModal;
    return {
        setters: [function (_flarumComponentsSettingsModal) {
            SettingsModal = _flarumComponentsSettingsModal.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }],
        execute: function () {
            RatingsSettingsModal = function (_SettingsModal) {
                babelHelpers.inherits(RatingsSettingsModal, _SettingsModal);

                function RatingsSettingsModal() {
                    babelHelpers.classCallCheck(this, RatingsSettingsModal);
                    return babelHelpers.possibleConstructorReturn(this, (RatingsSettingsModal.__proto__ || Object.getPrototypeOf(RatingsSettingsModal)).apply(this, arguments));
                }

                babelHelpers.createClass(RatingsSettingsModal, [{
                    key: 'className',
                    value: function className() {
                        return 'RatingsSettingsModal Modal--medium';
                    }
                }, {
                    key: 'title',
                    value: function title() {
                        return app.translator.trans('q7zh-ratings.admin.settings.title');
                    }
                }, {
                    key: 'getStored',
                    value: function getStored() {
                        var values = this.setting('q7zh.ratings.defaults', '[true, true, true, true]')();
                        return JSON.parse(values);
                    }
                }, {
                    key: 'getDefaults',
                    value: function getDefaults(index) {
                        return this.getStored()[index];
                    }
                }, {
                    key: 'setDefaults',
                    value: function setDefaults(index, value) {
                        var values = this.getStored();
                        values[index] = value;
                        var valueString = JSON.stringify(values);
                        this.setting('q7zh.ratings.defaults')(valueString);
                    }
                }, {
                    key: 'form',
                    value: function form() {
                        var _this2 = this;

                        return [m('div', { className: 'Q7zhRatings' }, [m('fieldset', { className: 'Q7zhRatings-default-switch' }, [m('legend', {}, app.translator.trans('q7zh-ratings.admin.settings.defaults.title')), m('div', { className: 'helpText' }, app.translator.trans('q7zh-ratings.admin.settings.defaults.help')), Switch.component({
                            state: this.getDefaults(0),
                            onchange: function onchange(value) {
                                _this2.setDefaults(0, value);
                            },
                            children: app.translator.trans('q7zh-ratings.admin.settings.defaults.general')
                        }), Switch.component({
                            state: this.getDefaults(1),
                            onchange: function onchange(value) {
                                _this2.setDefaults(1, value);
                            },
                            children: app.translator.trans('q7zh-ratings.admin.settings.defaults.mature')
                        }), Switch.component({
                            state: this.getDefaults(2),
                            onchange: function onchange(value) {
                                _this2.setDefaults(2, value);
                            },
                            children: app.translator.trans('q7zh-ratings.admin.settings.defaults.explict')
                        }), Switch.component({
                            state: this.getDefaults(3),
                            onchange: function onchange(value) {
                                _this2.setDefaults(3, value);
                            },
                            children: app.translator.trans('q7zh-ratings.admin.settings.defaults.teen')
                        })])])];
                    }
                }]);
                return RatingsSettingsModal;
            }(SettingsModal);

            _export('default', RatingsSettingsModal);
        }
    };
});;
'use strict';

System.register('q7zh/flarum-ext-ratings/main', ['flarum/app', 'flarum/extend', 'q7zh/flarum-ext-ratings/components/RatingsSettingsModal'], function (_export, _context) {
    "use strict";

    var app, extend, RatingsSettingsModal;
    return {
        setters: [function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_q7zhFlarumExtRatingsComponentsRatingsSettingsModal) {
            RatingsSettingsModal = _q7zhFlarumExtRatingsComponentsRatingsSettingsModal.default;
        }],
        execute: function () {

            app.initializers.add('q7zh-ratings', function () {
                app.extensionSettings['q7zh-ratings'] = function () {
                    return app.modal.show(new RatingsSettingsModal());
                };
            });
        }
    };
});