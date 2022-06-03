import App from "../App";
import Event, { EventType } from "../types/Event";
import controller from "../controller";

export default new Event('ready',
    (app: App) => {
        return async () => {
            await controller.ready.run(app)
        }
    },
    EventType.once
)