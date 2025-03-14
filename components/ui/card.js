"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = Card;
exports.CardHeader = CardHeader;
exports.CardFooter = CardFooter;
exports.CardTitle = CardTitle;
exports.CardDescription = CardDescription;
exports.CardContent = CardContent;
const React = __importStar(require("react"));
const utils_1 = require("@/lib/utils");
function Card(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div data-slot="card" className={(0, utils_1.cn)("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className)} {...props}/>);
}
function CardHeader(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div data-slot="card-header" className={(0, utils_1.cn)("flex flex-col gap-1.5 px-6", className)} {...props}/>);
}
function CardTitle(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div data-slot="card-title" className={(0, utils_1.cn)("leading-none font-semibold", className)} {...props}/>);
}
function CardDescription(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div data-slot="card-description" className={(0, utils_1.cn)("text-muted-foreground text-sm", className)} {...props}/>);
}
function CardContent(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div data-slot="card-content" className={(0, utils_1.cn)("px-6", className)} {...props}/>);
}
function CardFooter(_a) {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<div data-slot="card-footer" className={(0, utils_1.cn)("flex items-center px-6", className)} {...props}/>);
}
