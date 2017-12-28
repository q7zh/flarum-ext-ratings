import app from 'flarum/app';
import { extend } from 'flarum/extend';
import RatingsSettingsModal from 'q7zh/flarum-ext-ratings/components/RatingsSettingsModal';

app.initializers.add('q7zh-ratings', () => {
    app.extensionSettings['q7zh-ratings'] = () => app.modal.show(new RatingsSettingsModal());
});