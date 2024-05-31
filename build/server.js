"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_controller_1 = __importDefault(require("./src/controllers/eventos-controller"));
const provincias_controller_1 = __importDefault(require("./src/controllers/provincias-controller"));
const user_controller_1 = __importDefault(require("./src/controllers/user-controller"));
const category_controller_1 = __importDefault(require("./src/controllers/category-controller"));
const location_controller_1 = __importDefault(require("./src/controllers/location-controller"));
const event_location_controller_1 = __importDefault(require("./src/controllers/event-location-controller"));
const app = (0, express_1.default)();
const port = 5050;
app.use(express_1.default.json());
app.use("/api/event", eventos_controller_1.default);
app.use("/api/user", user_controller_1.default);
app.use("/api/provincias", provincias_controller_1.default);
app.use("/api/event-category", category_controller_1.default);
app.use("/api/location", location_controller_1.default);
app.use("/api/event-location", event_location_controller_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=server.js.map