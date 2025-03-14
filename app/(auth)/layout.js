"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Layout = ({ children }) => {
    return (<div className="auth-layout">
      <main className="auth-layout__main">{children}</main>
    </div>);
};
exports.default = Layout;
