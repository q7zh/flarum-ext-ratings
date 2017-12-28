import SettingsModal from 'flarum/components/SettingsModal';
import Switch from "flarum/components/Switch";
import app from 'flarum/app';

export default class RatingsSettingsModal extends SettingsModal {

	className() {
        return 'RatingsSettingsModal Modal--medium';
    }

    title() {
        return app.translator.trans('q7zh-ratings.admin.settings.title');
    }

    getStored() {
        var values = this.setting('q7zh.ratings.defaults', '[true, true, true, true]')();
        return JSON.parse(values);
    }

    getDefaults(index) {
        return this.getStored()[index];
    }

    setDefaults(index, value) {
        var values = this.getStored();
        values[index] = value;
        var valueString = JSON.stringify(values);
        this.setting('q7zh.ratings.defaults')(valueString);
    }

    form() {
    	return [
    		m('div', {className: 'Q7zhRatings'}, [
                m('fieldset', {className: 'Q7zhRatings-default-switch'}, [
                    m('legend', {}, app.translator.trans('q7zh-ratings.admin.settings.defaults.title')),
                    m('div', {className: 'helpText'}, app.translator.trans('q7zh-ratings.admin.settings.defaults.help')),
                    Switch.component({
                        state: this.getDefaults(0),
                        onchange: (value) => { this.setDefaults(0, value); },
                        children: app.translator.trans('q7zh-ratings.admin.settings.defaults.general'),
                    }),
                    Switch.component({
                        state: this.getDefaults(1),
                        onchange: (value) => { this.setDefaults(1, value); },
                        children: app.translator.trans('q7zh-ratings.admin.settings.defaults.mature'),
                    }),
                    Switch.component({
                        state: this.getDefaults(2),
                        onchange: (value) => { this.setDefaults(2, value); },
                        children: app.translator.trans('q7zh-ratings.admin.settings.defaults.explict'),
                    }),
                    Switch.component({
                        state: this.getDefaults(3),
                        onchange: (value) => { this.setDefaults(3, value); },
                        children: app.translator.trans('q7zh-ratings.admin.settings.defaults.teen'),
                    }),
                ]),
    		]),
    	];
    }
}