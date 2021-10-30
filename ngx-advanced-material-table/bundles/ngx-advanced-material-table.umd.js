(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/localize/init'), require('@angular/core'), require('@angular/material/dialog'), require('@angular/forms'), require('@angular/material/button'), require('@angular/material/icon'), require('@angular/material/form-field'), require('@angular/cdk/scrolling'), require('@angular/material/checkbox'), require('@angular/material/button-toggle'), require('@angular/material/input'), require('@angular/common'), require('lodash'), require('@angular/material/sort'), require('rxjs/operators'), require('@angular/material/paginator'), require('@angular/material/table'), require('@angular/cdk/collections'), require('@angular/material/menu'), require('@angular/material/tooltip'), require('@angular/cdk/drag-drop'), require('@angular/cdk/table'), require('@angular/material/core')) :
    typeof define === 'function' && define.amd ? define('ngx-advanced-material-table', ['exports', '@angular/localize/init', '@angular/core', '@angular/material/dialog', '@angular/forms', '@angular/material/button', '@angular/material/icon', '@angular/material/form-field', '@angular/cdk/scrolling', '@angular/material/checkbox', '@angular/material/button-toggle', '@angular/material/input', '@angular/common', 'lodash', '@angular/material/sort', 'rxjs/operators', '@angular/material/paginator', '@angular/material/table', '@angular/cdk/collections', '@angular/material/menu', '@angular/material/tooltip', '@angular/cdk/drag-drop', '@angular/cdk/table', '@angular/material/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["ngx-advanced-material-table"] = {}, global.ng.localize.init, global.ng.core, global.ng.material.dialog, global.ng.forms, global.ng.material.button, global.ng.material.icon, global.ng.material.formField, global.ng.cdk.scrolling, global.ng.material.checkbox, global.ng.material.buttonToggle, global.ng.material.input, global.ng.common, global._, global.ng.material.sort, global.rxjs.operators, global.ng.material.paginator, global.ng.material.table, global.ng.cdk.collections, global.ng.material.menu, global.ng.material.tooltip, global.ng.cdk.dragDrop, global.ng.cdk.table, global.ng.material.core));
})(this, (function (exports, init, i0, i1, i2, i3, i4, i5, i6, i7, i8, i9, i11, _, i10, operators, i7$1, i8$1, collections, i6$1, i13, i14, table, core) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);
    var i1__namespace = /*#__PURE__*/_interopNamespace(i1);
    var i2__namespace = /*#__PURE__*/_interopNamespace(i2);
    var i3__namespace = /*#__PURE__*/_interopNamespace(i3);
    var i4__namespace = /*#__PURE__*/_interopNamespace(i4);
    var i5__namespace = /*#__PURE__*/_interopNamespace(i5);
    var i6__namespace = /*#__PURE__*/_interopNamespace(i6);
    var i7__namespace = /*#__PURE__*/_interopNamespace(i7);
    var i8__namespace = /*#__PURE__*/_interopNamespace(i8);
    var i9__namespace = /*#__PURE__*/_interopNamespace(i9);
    var i11__namespace = /*#__PURE__*/_interopNamespace(i11);
    var ___namespace = /*#__PURE__*/_interopNamespace(_);
    var i10__namespace = /*#__PURE__*/_interopNamespace(i10);
    var i7__namespace$1 = /*#__PURE__*/_interopNamespace(i7$1);
    var i8__namespace$1 = /*#__PURE__*/_interopNamespace(i8$1);
    var i6__namespace$1 = /*#__PURE__*/_interopNamespace(i6$1);
    var i13__namespace = /*#__PURE__*/_interopNamespace(i13);
    var i14__namespace = /*#__PURE__*/_interopNamespace(i14);

    exports.ColumnType = void 0;
    (function (ColumnType) {
        ColumnType[ColumnType["String"] = 0] = "String";
        ColumnType[ColumnType["DateTime"] = 1] = "DateTime";
        ColumnType[ColumnType["Date"] = 2] = "Date";
        ColumnType[ColumnType["Time"] = 3] = "Time";
        ColumnType[ColumnType["Actions"] = 4] = "Actions";
        ColumnType[ColumnType["DropDown"] = 5] = "DropDown";
        ColumnType[ColumnType["Icon"] = 6] = "Icon";
        ColumnType[ColumnType["NumberInput"] = 7] = "NumberInput";
        ColumnType[ColumnType["DropDownDynamic"] = 8] = "DropDownDynamic";
        ColumnType[ColumnType["Image"] = 9] = "Image";
        ColumnType[ColumnType["Link"] = 10] = "Link";
    })(exports.ColumnType || (exports.ColumnType = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }

    var Value = /** @class */ (function () {
        function Value() {
        }
        Value.getDistinctItems = function (items) {
            var newArray = [];
            items.forEach(function (item) {
                if (newArray.indexOf(item) === -1) {
                    newArray.push(item);
                }
            });
            return newArray;
        };
        Value.splitStringBySeperator = function (text, seperator) {
            if (seperator === void 0) { seperator = ','; }
            if (Value.isNullOrWhiteSpace(text)) {
                return [];
            }
            var strs = text.split(seperator);
            strs = strs.map(function (str) { return str.trim(); });
            return strs.filter(function (str) { return Value.isNotNullOrWhiteSpace(str); });
        };
        Value.extractValueSplitBySeparator = function (value, separator, index) {
            return value.indexOf(separator) > -1 ? value.split('_')[index] : '';
        };
        Value.isNumber = function (value) {
            if (Value.isNotNullOrUndefined(value) && /^\d+(\.\d+)?$/.test(value.toString())) {
                return true;
            }
            return false;
        };
        Value.isNumberWithPattern = function (value, pattern) {
            if (Value.isNotNullOrUndefined(value) && pattern.test(value.toString())) {
                return true;
            }
            return false;
        };
        Value.clearArray = function (value) {
            if (Value.isArray(value)) {
                value.splice(0, value.length);
            }
        };
        Value.isArray = function (value) {
            if (Value.isNotNullOrUndefined(value) && value instanceof Array) {
                return true;
            }
            return false;
        };
        Value.isString = function (value) {
            if (typeof value === 'string') {
                return true;
            }
            return false;
        };
        Value.isArrayWithItems = function (value) {
            if (Value.isArray(value) && value.length > 0) {
                return true;
            }
            return false;
        };
        Value.isNullOrUndefined = function (value) {
            return !Value.isNotNullOrUndefined(value);
        };
        Value.isNotNullOrUndefined = function (value) {
            if (value !== undefined && value !== null) {
                return true;
            }
            return false;
        };
        Value.isNotNullOrWhiteSpace = function (value) {
            if (Value.isNotNullOrUndefined(value) && value.trim() !== '') {
                return true;
            }
            return false;
        };
        Value.isNullOrWhiteSpace = function (value) {
            return !Value.isNotNullOrWhiteSpace(value);
        };
        Value.isStringContains = function (source, toBeMatched, caseSensitive) {
            if (caseSensitive === void 0) { caseSensitive = true; }
            if (!source || !toBeMatched) {
                return false;
            }
            if (caseSensitive) {
                if (source.indexOf(toBeMatched) !== -1) {
                    return true;
                }
                return false;
            }
            else {
                if (source.toLocaleLowerCase().indexOf(toBeMatched.toLocaleLowerCase()) !== -1) {
                    return true;
                }
                return false;
            }
        };
        Value.isArrayContains = function (sourceList, toBeMatched, caseSensitive) {
            var e_1, _a;
            if (caseSensitive === void 0) { caseSensitive = true; }
            if (!sourceList || !toBeMatched) {
                return false;
            }
            try {
                for (var sourceList_1 = __values(sourceList), sourceList_1_1 = sourceList_1.next(); !sourceList_1_1.done; sourceList_1_1 = sourceList_1.next()) {
                    var source = sourceList_1_1.value;
                    if (caseSensitive) {
                        if (source.indexOf(toBeMatched) !== -1) {
                            return true;
                        }
                    }
                    else {
                        if (source.toLocaleLowerCase().indexOf(toBeMatched.toLocaleLowerCase()) !== -1) {
                            return true;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (sourceList_1_1 && !sourceList_1_1.done && (_a = sourceList_1.return)) _a.call(sourceList_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        };
        return Value;
    }());

    exports.DialogActionType = void 0;
    (function (DialogActionType) {
        DialogActionType["Ok"] = "Ok";
        DialogActionType["Cancel"] = "Cancel";
    })(exports.DialogActionType || (exports.DialogActionType = {}));

    var FilterColumnValuesPipe = /** @class */ (function () {
        function FilterColumnValuesPipe() {
        }
        FilterColumnValuesPipe.prototype.transform = function (items, searchText) {
            if (!items) {
                return [];
            }
            if (!searchText) {
                return items;
            }
            searchText = searchText.toLowerCase();
            return items.filter(function (it) {
                return it.name.toString().toLowerCase().includes(searchText);
            });
        };
        return FilterColumnValuesPipe;
    }());
    FilterColumnValuesPipe.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: FilterColumnValuesPipe, deps: [], target: i0__namespace.ɵɵFactoryTarget.Pipe });
    FilterColumnValuesPipe.ɵpipe = i0__namespace.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: FilterColumnValuesPipe, name: "filterCriteria" });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: FilterColumnValuesPipe, decorators: [{
                type: i0.Pipe,
                args: [{ name: 'filterCriteria' }]
            }] });

    var FilterColumnsComponent = /** @class */ (function () {
        function FilterColumnsComponent(dialogRef, fb, context) {
            this.dialogRef = dialogRef;
            this.fb = fb;
            this.context = context;
            this.searchFiltersValue = '';
            this.distinctColumnValues = [];
            this.cancelResponse = { action: exports.DialogActionType.Cancel };
            this.columnType = exports.ColumnType;
            this.selectedColumn = this.context.selectedColumn;
            this.distinctColumnValues = this.sortColumns(this.context.distinctData);
            this.initialSortingDirection = this.selectedColumn.SortDirection;
            this.filterForm = this.fb.group({
                SearchFilters: [''],
            });
        }
        FilterColumnsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.filterForm.controls.SearchFilters.valueChanges.subscribe(function () { return _this.onSearchFiltersValueChanged(); });
        };
        FilterColumnsComponent.prototype.onSearchFiltersValueChanged = function () {
            this.searchFiltersValue = this.filterForm.controls.SearchFilters.value;
        };
        FilterColumnsComponent.prototype.onSelectFilter = function (change) {
            this.distinctColumnValues.forEach(function (x) {
                if (x.name === change.source.value) {
                    x.checked = change.checked;
                }
            });
        };
        FilterColumnsComponent.prototype.onSortingValueChange = function (value) {
            if (this.selectedColumn.SortDirection === value) {
                this.selectedColumn.SortDirection = undefined;
            }
            else {
                this.selectedColumn.SortDirection = value;
            }
        };
        FilterColumnsComponent.prototype.onApplyFiltersButton = function () {
            this.selectedColumn.FilterValues = [];
            this.selectedColumn.FilterValues = this.distinctColumnValues.filter(function (x) { return x.checked === true; }).map(function (x) { return x.name; });
            var response = {
                action: exports.DialogActionType.Ok,
                sortingHasChanged: this.initialSortingDirection !== this.selectedColumn.SortDirection,
                selectedColumn: this.selectedColumn,
            };
            this.dialogRef.close(response);
        };
        FilterColumnsComponent.prototype.sortColumns = function (columns) {
            if (columns.length === 0) {
                return [];
            }
            if (columns[0].name instanceof Date) {
                columns.sort(function (a, b) { return (a.name > b.name ? 1 : -1); });
            }
            else if (Value.isNumber(columns[0].name)) {
                columns.sort(function (a, b) { return a.name - b.name; });
            }
            else if (Value.isString(columns[0].name)) {
                columns.sort(function (a, b) { return a.name.localeCompare(b.name); });
            }
            return columns;
        };
        return FilterColumnsComponent;
    }());
    FilterColumnsComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: FilterColumnsComponent, deps: [{ token: i1__namespace.MatDialogRef }, { token: i2__namespace.FormBuilder }, { token: i1.MAT_DIALOG_DATA }], target: i0__namespace.ɵɵFactoryTarget.Component });
    FilterColumnsComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.12", type: FilterColumnsComponent, selector: "filter-columns", ngImport: i0__namespace, template: "<div class=\"filter-columns\">\n    <button mat-icon-button class=\"close-icon\" [mat-dialog-close]=\"cancelResponse\">\n        <mat-icon>close</mat-icon>\n    </button>\n\n    <h3 mat-dialog-title i18n=\"@@filter-columns-label-filterRowsHeading\">Filter rows</h3>\n\n    <mat-dialog-content>\n        <form id=\"formFilterRoutesPlanning\" role=\"form\" [formGroup]=\"filterForm\">\n            <mat-form-field>\n                <mat-label i18n=\"@@formControl-label-filterGrid\">Search filters</mat-label>\n                <input matInput type=\"text\" formControlName=\"SearchFilters\" id=\"FilterString\" />\n            </mat-form-field>\n        </form>\n\n        <cdk-virtual-scroll-viewport itemSize=\"15\" class=\"filter-column-viewport\">\n            <span *ngIf=\"distinctColumnValues.length === 0\" i18n=\"@@routeplanning-filter-column-no-values\">No available values</span>\n\n            <div\n                class=\"filter-column-item\"\n                *cdkVirtualFor=\"let value of distinctColumnValues | filterCriteria: searchFiltersValue; let i = index\"\n            >\n                <mat-checkbox [value]=\"value.name\" [checked]=\"value.checked\" (change)=\"onSelectFilter($event)\">\n                    <span> {{ value.displayedName }}</span>\n                </mat-checkbox>\n            </div>\n        </cdk-virtual-scroll-viewport>\n\n        <mat-button-toggle-group name=\"sortDirection\" value=\"{{ selectedColumn.SortDirection }}\">\n            <mat-button-toggle id=\"filter-columns-sort-ascending\" value=\"asc\" (change)=\"onSortingValueChange($event.value)\">\n                <span i18n=\"@@filterColumns-btn-ascsort\">Ascending</span>\n                <mat-icon>arrow_upward</mat-icon>\n            </mat-button-toggle>\n            <mat-button-toggle id=\"filter-columns-sort-descending\" value=\"desc\" (change)=\"onSortingValueChange($event.value)\">\n                <span i18n=\"@@filterColumns-btn-descsort\">Descending</span>\n                <mat-icon>arrow_downward</mat-icon>\n            </mat-button-toggle>\n        </mat-button-toggle-group>\n    </mat-dialog-content>\n\n    <mat-dialog-actions>\n        <button mat-raised-button id=\"filter-columns-close\" [mat-dialog-close]=\"cancelResponse\">\n            <span i18n=\"@@action-btn-cancel\">Cancel</span>\n        </button>\n        <button mat-raised-button id=\"filter-columns-filter\" (click)=\"onApplyFiltersButton()\" color=\"accent\">\n            <span i18n=\"@@action-btn-filter\">Filter</span>\n        </button>\n    </mat-dialog-actions>\n</div>\n", styles: [".filter-columns{position:relative!important}.filter-columns .close-icon{position:absolute;top:-20px;right:-20px}.filter-columns mat-form-field{width:100%}.filter-columns .filter-column-viewport{height:13em;border:1px solid lightgray}.filter-columns .filter-column-item{height:25px;padding:.2em .5em}.filter-columns mat-button-toggle-group{margin-top:16px;width:100%}.filter-columns mat-button-toggle-group mat-button-toggle{flex:1 1 auto}.filter-columns mat-dialog-actions button{flex:1 1 auto}\n"], components: [{ type: i3__namespace.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4__namespace.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i5__namespace.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i6__namespace.CdkVirtualScrollViewport, selector: "cdk-virtual-scroll-viewport", inputs: ["orientation", "appendOnly"], outputs: ["scrolledIndexChange"] }, { type: i7__namespace.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "id", "labelPosition", "name", "required", "checked", "disabled", "indeterminate", "aria-describedby", "value"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { type: i8__namespace.MatButtonToggle, selector: "mat-button-toggle", inputs: ["disableRipple", "aria-labelledby", "tabIndex", "appearance", "checked", "disabled", "id", "name", "aria-label", "value"], outputs: ["change"], exportAs: ["matButtonToggle"] }], directives: [{ type: i1__namespace.MatDialogClose, selector: "[mat-dialog-close], [matDialogClose]", inputs: ["type", "mat-dialog-close", "aria-label", "matDialogClose"], exportAs: ["matDialogClose"] }, { type: i1__namespace.MatDialogTitle, selector: "[mat-dialog-title], [matDialogTitle]", inputs: ["id"], exportAs: ["matDialogTitle"] }, { type: i1__namespace.MatDialogContent, selector: "[mat-dialog-content], mat-dialog-content, [matDialogContent]" }, { type: i2__namespace.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { type: i2__namespace.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { type: i2__namespace.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { type: i5__namespace.MatLabel, selector: "mat-label" }, { type: i9__namespace.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["id", "disabled", "required", "type", "value", "readonly", "placeholder", "errorStateMatcher", "aria-describedby"], exportAs: ["matInput"] }, { type: i2__namespace.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2__namespace.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2__namespace.FormControlName, selector: "[formControlName]", inputs: ["disabled", "formControlName", "ngModel"], outputs: ["ngModelChange"] }, { type: i6__namespace.CdkFixedSizeVirtualScroll, selector: "cdk-virtual-scroll-viewport[itemSize]", inputs: ["itemSize", "minBufferPx", "maxBufferPx"] }, { type: i11__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i6__namespace.CdkVirtualForOf, selector: "[cdkVirtualFor][cdkVirtualForOf]", inputs: ["cdkVirtualForOf", "cdkVirtualForTrackBy", "cdkVirtualForTemplate", "cdkVirtualForTemplateCacheSize"] }, { type: i8__namespace.MatButtonToggleGroup, selector: "mat-button-toggle-group", inputs: ["appearance", "name", "vertical", "value", "multiple", "disabled"], outputs: ["valueChange", "change"], exportAs: ["matButtonToggleGroup"] }, { type: i1__namespace.MatDialogActions, selector: "[mat-dialog-actions], mat-dialog-actions, [matDialogActions]" }], pipes: { "filterCriteria": FilterColumnValuesPipe } });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: FilterColumnsComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'filter-columns',
                        templateUrl: './filter-columns.component.html',
                        styleUrls: ['./filter-columns.component.scss'],
                    }]
            }], ctorParameters: function () {
            return [{ type: i1__namespace.MatDialogRef }, { type: i2__namespace.FormBuilder }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [i1.MAT_DIALOG_DATA]
                        }] }];
        } });

    var ColumnHelper = /** @class */ (function () {
        function ColumnHelper() {
        }
        ColumnHelper.getContent = function (field, element) {
            if (field.indexOf('.') === -1) {
                return element[field];
            }
            // Activate the way to get text from  Class.Element.XX.XX.XX
            var fieldNames = field.split('.');
            var returnValue = element[fieldNames[0]];
            for (var index = 1; index < fieldNames.length; index++) {
                returnValue = returnValue[fieldNames[index]];
            }
            return returnValue !== null && returnValue !== void 0 ? returnValue : '';
        };
        ColumnHelper.getToolTip = function (column, element) {
            if (!element || !column || !element[column.Field]) {
                return '';
            }
            var val;
            switch (column.ColumnType) {
                case exports.ColumnType.Date:
                case exports.ColumnType.DateTime:
                case exports.ColumnType.Time:
                case exports.ColumnType.Icon:
                case exports.ColumnType.DropDown:
                case exports.ColumnType.String:
                case exports.ColumnType.Link:
                case exports.ColumnType.Image:
                    val = element[column.Field];
                    break;
                default:
                    val = '';
                    break;
            }
            return val;
        };
        ColumnHelper.isImmutableColumn = function (column) {
            // Columns types that cannot be hidden, moved or filtered
            return column.ColumnType === exports.ColumnType.Actions || column.ColumnType === exports.ColumnType.Icon;
        };
        ColumnHelper.canColumnBeHidden = function (column) {
            return !this.isImmutableColumn(column);
        };
        ColumnHelper.canColumnBeMoved = function (column) {
            return !this.isImmutableColumn(column);
        };
        ColumnHelper.canColumnBeFiltered = function (column) {
            return !this.isImmutableColumn(column);
        };
        ColumnHelper.isFilteringEnabledOnColumn = function (column) {
            if (!this.canColumnBeFiltered(column)) {
                return false;
            }
            if (!column.Title) {
                return false;
            }
            return true;
        };
        ColumnHelper.hasFiltersOrSortingEnabled = function (column) {
            if (!column) {
                return false;
            }
            if (column.SortDirection) {
                return true;
            }
            if (column.FilterValues && column.FilterValues.length > 0) {
                return true;
            }
            return false;
        };
        ColumnHelper.isCellClickable = function (column) {
            switch (column.ColumnType) {
                case exports.ColumnType.Actions:
                case exports.ColumnType.Icon:
                case exports.ColumnType.DropDown:
                case exports.ColumnType.NumberInput:
                case exports.ColumnType.DropDownDynamic:
                    return false;
                default:
                    return true;
            }
        };
        return ColumnHelper;
    }());

    var TableBuilderHelper = /** @class */ (function () {
        function TableBuilderHelper() {
        }
        TableBuilderHelper.buildTable = function (dataArray, columns, columnNames) {
            var e_1, _a, e_2, _b, e_3, _c;
            var out = '<table><thead><tr>';
            try {
                for (var columnNames_1 = __values(columnNames), columnNames_1_1 = columnNames_1.next(); !columnNames_1_1.done; columnNames_1_1 = columnNames_1.next()) {
                    var h = columnNames_1_1.value;
                    out += '<th>' + h + '</th>';
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (columnNames_1_1 && !columnNames_1_1.done && (_a = columnNames_1.return)) _a.call(columnNames_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            out += '</tr></thead><tbody>';
            try {
                for (var dataArray_1 = __values(dataArray), dataArray_1_1 = dataArray_1.next(); !dataArray_1_1.done; dataArray_1_1 = dataArray_1.next()) {
                    var data = dataArray_1_1.value;
                    out += '<tr>';
                    try {
                        for (var columns_1 = (e_3 = void 0, __values(columns)), columns_1_1 = columns_1.next(); !columns_1_1.done; columns_1_1 = columns_1.next()) {
                            var j = columns_1_1.value;
                            if (j !== 'select' && j !== 'actions') {
                                out += '<td>' + (ColumnHelper.getContent(j, data) || '-') + '</td>';
                            }
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (columns_1_1 && !columns_1_1.done && (_c = columns_1.return)) _c.call(columns_1);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    out += '</tr>';
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (dataArray_1_1 && !dataArray_1_1.done && (_b = dataArray_1.return)) _b.call(dataArray_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            out += '</tbody></table>';
            return out;
        };
        TableBuilderHelper.printPageBuilderDefault = function (table, printedOnLabel) {
            if (printedOnLabel === void 0) { printedOnLabel = 'Printed On'; }
            return ('<html><head>' +
                '<style type="text/css" media="print">' +
                '  @page { size: auto;   margin: 25px 0 25px 0; }' +
                '</style>' +
                '<style type="text/css" media="all">' +
                'table{border-collapse: collapse; font-size: 12px; }\n' +
                'table, th, td {border: 1px solid grey}\n' +
                'th, td {text-align: center; vertical-align: middle;}\n' +
                'p {font-weight: bold; margin-left:20px }\n' +
                'table { width:94%; margin-left:3%; margin-right:3%}\n' +
                'div.bs-table-print { text-align:center;}\n' +
                '</style></head><title>Print Table</title><body>' +
                '<p>' +
                printedOnLabel +
                ': ' +
                new Date() +
                ' </p>' +
                '<div class="bs-table-print">' +
                table +
                '</div></body></html>');
        };
        return TableBuilderHelper;
    }());

    /**
     * Comunication with the localStorage
     */
    var LocalStorageService = /** @class */ (function () {
        function LocalStorageService() {
        }
        LocalStorageService.prototype.set = function (key, value) {
            localStorage.setItem(key, value);
        };
        LocalStorageService.prototype.get = function (key) {
            return localStorage.getItem(key);
        };
        LocalStorageService.prototype.remove = function (key) {
            localStorage.removeItem(key);
        };
        LocalStorageService.prototype.setAsJson = function (localStorageKey, state, replacer) {
            localStorage.setItem(localStorageKey, JSON.stringify(state, replacer));
        };
        LocalStorageService.prototype.getAsJson = function (localStorageKey) {
            var storedValue = localStorage.getItem(localStorageKey);
            return storedValue ? JSON.parse(storedValue) : null;
        };
        LocalStorageService.prototype.exists = function (localStorageKey) {
            if (localStorage.getItem(localStorageKey)) {
                return true;
            }
            else {
                return false;
            }
        };
        return LocalStorageService;
    }());
    LocalStorageService.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: LocalStorageService, deps: [], target: i0__namespace.ɵɵFactoryTarget.Injectable });
    LocalStorageService.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: LocalStorageService, providedIn: 'root' });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: LocalStorageService, decorators: [{
                type: i0.Injectable,
                args: [{ providedIn: 'root' }]
            }] });

    var AdvancedMaterialTableComponent = /** @class */ (function () {
        function AdvancedMaterialTableComponent(dialog, localStorageService, cdref) {
            this.dialog = dialog;
            this.localStorageService = localStorageService;
            this.cdref = cdref;
            this.actionSelected = new i0.EventEmitter();
            this.iconClicked = new i0.EventEmitter();
            this.rowSelected = new i0.EventEmitter();
            this.numberChange = new i0.EventEmitter();
            this.catalogueClicked = new i0.EventEmitter();
            this.searchCatalogueClicked = new i0.EventEmitter();
            this.clearCatalogueClicked = new i0.EventEmitter();
            this.hyperLinkClicked = new i0.EventEmitter();
            this.displayedColumns = [];
            this.noRowsDisplayed = false;
            this.hasHiddenColumns = false;
            this.columnType = exports.ColumnType;
            this.selection = new collections.SelectionModel(true, []);
            this.tableColumnList = [];
            this.mainFilter = '';
            this.getContent = function (column, element) { return ColumnHelper.getContent(column.Field, element); };
            this.getToolTip = function (row, column) { return ColumnHelper.getToolTip(column, row); };
            //#endregion
            //#region Checks (Header, Cell, Column or Row)
            this.isImmutableColumn = ColumnHelper.isImmutableColumn;
            this.canColumnBeHidden = ColumnHelper.canColumnBeHidden;
            this.canColumnBeMoved = ColumnHelper.canColumnBeMoved;
            this.canColumnBeFiltered = ColumnHelper.canColumnBeFiltered;
            this.isFilteringEnabledOnColumn = ColumnHelper.isFilteringEnabledOnColumn;
            this.hasFiltersOrSortingEnabled = ColumnHelper.hasFiltersOrSortingEnabled;
            this.isCellClickable = ColumnHelper.isCellClickable;
        }
        Object.defineProperty(AdvancedMaterialTableComponent.prototype, "tableColumns", {
            get: function () {
                return this.tableColumnList;
            },
            set: function (value) {
                this.tableColumnList = ___namespace.cloneDeep(value);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdvancedMaterialTableComponent.prototype, "data", {
            get: function () {
                return this.dataset;
            },
            set: function (value) {
                this.dataset = value;
                this.initializeTable();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AdvancedMaterialTableComponent.prototype, "selectedData", {
            get: function () {
                return this.selection.selected;
            },
            set: function (initialSelection) {
                this.selection = new collections.SelectionModel(true, initialSelection);
            },
            enumerable: false,
            configurable: true
        });
        AdvancedMaterialTableComponent.prototype.ngOnInit = function () {
            this.loadFromStorage();
            this.renderColumns();
            this.localizePaginator();
        };
        AdvancedMaterialTableComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            this.sortColumns();
            this.sort.sortChange.subscribe(function (col) {
                if (!col.active) {
                    return;
                }
                _this.tableColumnList.forEach(function (column) {
                    if (column.Field !== col.active) {
                        column.SortDirection = undefined;
                    }
                    else {
                        column.SortDirection = col.direction;
                    }
                });
            });
            this.initializeTable();
        };
        AdvancedMaterialTableComponent.prototype.initializeTable = function () {
            if (this.data) {
                this.noRowsDisplayed = this.data.length === 0;
            }
            this.dataSource = new i8$1.MatTableDataSource(this.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sortingDataAccessor = function (item, property) {
                var content = ColumnHelper.getContent(property, item);
                if (!content) {
                    return '';
                }
                return content.toString().toLowerCase();
            };
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = this.getFilterPredicate();
            this.applyFilters();
        };
        AdvancedMaterialTableComponent.prototype.renderColumns = function () {
            this.displayedColumns = this.tableColumns.filter(function (column) { return column.Display === true; }).map(function (column) { return column.Field; });
            if (this.tableConfiguration.AllowSelect) {
                // Add the 'select' column at the start
                this.displayedColumns.unshift('select');
            }
        };
        AdvancedMaterialTableComponent.prototype.onRowChecked = function (row) {
            if (this.tableConfiguration.MultipleSelect) {
                this.multipleRowSelection(row);
            }
            else {
                this.singleRowSelection(row);
            }
            this.rowSelected.emit([false, this.selection.selected]);
        };
        AdvancedMaterialTableComponent.prototype.onDoubleClick = function (row) {
            this.rowSelected.emit([true, [row]]);
        };
        AdvancedMaterialTableComponent.prototype.masterToggle = function () {
            var _this = this;
            this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
            this.rowSelected.emit([false, this.selection.selected]);
        };
        AdvancedMaterialTableComponent.prototype.isAllSelected = function () {
            var numSelected = this.selection.selected.length;
            var numRows = this.dataSource.data.length;
            return numSelected === numRows;
        };
        AdvancedMaterialTableComponent.prototype.getFilterPredicate = function () {
            var _this = this;
            return function (row, filters) {
                var e_1, _a;
                var filterData = JSON.parse(filters);
                var _loop_1 = function (filter) {
                    if (filter.values.length === 0) {
                        return "continue";
                    }
                    var value = ___namespace.get(row, filter.key);
                    if (!value || value === '') {
                        return { value: false };
                    }
                    var index = -1;
                    if (filter.type === exports.ColumnType.DateTime || filter.type === exports.ColumnType.Date) {
                        var dates = filter.values.map(function (x) { return new Date(x); });
                        index = dates.findIndex(function (x) { return x.getTime() === value.getTime(); });
                    }
                    else if (Value.isArray(value)) {
                        value = ___namespace.join(value, ',');
                        index = filter.values.findIndex(function (x) { return ___namespace.isEqual(x, value); });
                    }
                    else {
                        index = filter.values.findIndex(function (x) { return ___namespace.isEqual(x, value); });
                    }
                    if (index === -1) {
                        return { value: false };
                    }
                };
                try {
                    for (var filterData_1 = __values(filterData), filterData_1_1 = filterData_1.next(); !filterData_1_1.done; filterData_1_1 = filterData_1.next()) {
                        var filter = filterData_1_1.value;
                        var state_1 = _loop_1(filter);
                        if (typeof state_1 === "object")
                            return state_1.value;
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (filterData_1_1 && !filterData_1_1.done && (_a = filterData_1.return)) _a.call(filterData_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if (_this.mainFilter && _this.mainFilter.length > 0) {
                    var match_1 = false;
                    filterData.forEach(function (filter) {
                        var value = ___namespace.get(row, filter.key);
                        var stringValue = value.toLowerCase();
                        match_1 = match_1 || stringValue.indexOf(_this.mainFilter) !== -1;
                    });
                    return match_1;
                }
                return true;
            };
        };
        AdvancedMaterialTableComponent.prototype.onColumnChange = function (index, event) {
            if (this.tableColumns[index].Display && this.tableColumns.filter(function (c) { return c.Display; }).length <= 1) {
                event.preventDefault();
                return;
            }
            this.tableColumns[index].Display = !this.tableColumns[index].Display;
            this.renderColumns();
            this.saveColumnConfig();
        };
        AdvancedMaterialTableComponent.prototype.clearAllFilters = function () {
            this.tableColumnList.forEach(function (column) {
                column.SortDirection = undefined;
                column.FilterValues = undefined;
            });
            // Clear sort, see https://github.com/angular/components/issues/10524
            this.clearSort();
            this.dataSource.filter = '[]';
        };
        /**
         * Return from the Action Buttons
         * @param action Value From the Action Buttons
         */
        AdvancedMaterialTableComponent.prototype.onActionSelected = function (action) {
            this.actionSelected.emit(action);
        };
        AdvancedMaterialTableComponent.prototype.getMinValueForNumberInput = function (element, column) {
            if (!column || !column.NumberInputOptions) {
                return;
            }
            if (column.NumberInputOptions.MinInputNumberField) {
                return element[column.NumberInputOptions.MinInputNumberField];
            }
            return column.NumberInputOptions.MinInputNumber;
        };
        AdvancedMaterialTableComponent.prototype.getMaxValueForNumberInput = function (element, column) {
            if (!column.NumberInputOptions) {
                return;
            }
            if (column.NumberInputOptions.MaxInputNumberField) {
                return element[column.NumberInputOptions.MaxInputNumberField];
            }
            return column.NumberInputOptions.MaxInputNumber;
        };
        AdvancedMaterialTableComponent.prototype.iconClick = function (element, column) {
            this.iconClicked.emit([element, column]);
        };
        AdvancedMaterialTableComponent.prototype.numberInputChange = function (element, column, event) {
            this.numberChange.emit([element, column, event.target.value]);
        };
        AdvancedMaterialTableComponent.prototype.onCatalogueClicked = function (element, column) {
            this.catalogueClicked.emit([element, column]);
        };
        AdvancedMaterialTableComponent.prototype.onCatalogueSearchClicked = function (element, column) {
            this.searchCatalogueClicked.emit([element, column]);
        };
        AdvancedMaterialTableComponent.prototype.onCatalogueClearClicked = function (element, column) {
            this.clearCatalogueClicked.emit([element, column]);
        };
        AdvancedMaterialTableComponent.prototype.onHyperLinkClicked = function (element, column) {
            this.hyperLinkClicked.emit([element, column]);
        };
        AdvancedMaterialTableComponent.prototype.multipleRowSelection = function (row) {
            this.selection.toggle(row);
        };
        AdvancedMaterialTableComponent.prototype.singleRowSelection = function (row) {
            if (this.selection.isSelected(row)) {
                this.selection.clear();
            }
            else {
                this.selection.clear();
                this.selection.toggle(row);
            }
        };
        AdvancedMaterialTableComponent.prototype.getDistinctValues = function (selectedColumn) {
            var result = [];
            this.data.forEach(function (row) {
                var value = ___namespace.get(row, selectedColumn.Field);
                var displayedValue = value;
                if (Value.isArray(value)) {
                    value = ___namespace.join(value, ',');
                    displayedValue = value;
                }
                if (value === undefined || value === null || value === '') {
                    return;
                }
                var isAlreadyChecked = selectedColumn.FilterValues ? selectedColumn.FilterValues.findIndex(function (x) { return x === value; }) >= 0 : false;
                result.push({
                    name: value,
                    displayedName: displayedValue,
                    checked: isAlreadyChecked,
                });
            });
            result = ___namespace.uniqBy(result, function (x) { return x.displayedName; });
            return result;
        };
        //#region Drag and Drop
        AdvancedMaterialTableComponent.prototype.headerDragStarted = function (index) {
            // Purposedly in blank
        };
        AdvancedMaterialTableComponent.prototype.headerDropListDropped = function (event) {
            if (!event) {
                return;
            }
            var displayedColumns = this.displayedColumns.filter(function (x) { return x != 'select'; });
            var previousColumnIndex = this.tableColumns.findIndex(function (x) { return x.Field === displayedColumns[event.previousIndex]; });
            var currentColumnIndex = this.tableColumns.findIndex(function (x) { return x.Field === displayedColumns[event.currentIndex]; });
            if (this.canColumnBeMoved(this.tableColumns[currentColumnIndex])) {
                this.moveItemInArray(this.tableColumns, previousColumnIndex, currentColumnIndex);
                this.renderColumns();
                this.saveColumnConfig();
            }
        };
        //#endregion
        //#region Sorting and Filtering
        AdvancedMaterialTableComponent.prototype.applyMainFilter = function (event) {
            this.mainFilter = event.value.trim().toLowerCase();
            this.applyFilters();
        };
        AdvancedMaterialTableComponent.prototype.applyFilters = function () {
            var filters = [];
            this.tableColumnList.forEach(function (column) {
                if (!column.FilterValues) {
                    column.FilterValues = [];
                }
                filters.push({
                    key: column.Field,
                    type: column.ColumnType,
                    values: column.FilterValues,
                });
            });
            if (filters.length > 0) {
                this.dataSource.filter = JSON.stringify(filters);
            }
        };
        AdvancedMaterialTableComponent.prototype.sortColumn = function (id, start) {
            var currentColumn = this.sort.active;
            var currentDirection = this.sort.direction;
            if (id !== currentColumn || start !== currentDirection) {
                this.sort.sort({ id: '', start: start, disableClear: false });
                this.sort.sort({ id: id, start: start, disableClear: false });
            }
        };
        AdvancedMaterialTableComponent.prototype.clearSort = function () {
            // Clear sort, see https://github.com/angular/components/issues/10524
            var sortable = { id: null, start: null, disableClear: false };
            this.sort.sort(sortable);
        };
        AdvancedMaterialTableComponent.prototype.sortColumns = function () {
            var id = this.tableColumns.findIndex(function (column) { return column.SortDirection; });
            if (id === -1) {
                return;
            }
            var columnName = this.tableColumns[id].Field;
            var direction = this.tableColumns[id].SortDirection;
            this.clearSort();
            if (direction) {
                this.sortColumn(columnName, direction);
            }
            // HACK(Fernando Abel): https://github.com/angular/components/issues/10242
            var activeSortHeader = this.sort.sortables.get(columnName);
            if (activeSortHeader) {
                var viewState = activeSortHeader._isSorted()
                    ? { fromState: direction, toState: 'active' }
                    : { fromState: 'active', toState: direction };
                activeSortHeader._setAnimationTransitionState(viewState);
            }
            this.cdref.detectChanges();
        };
        //#endregion
        //#region Dialogs
        AdvancedMaterialTableComponent.prototype.openFilterDialog = function (selectedColumn) {
            var _this = this;
            var data = {
                selectedColumn: ___namespace.cloneDeep(selectedColumn),
                distinctData: this.getDistinctValues(selectedColumn),
            };
            var columnFilteringDialog = this.dialog.open(FilterColumnsComponent, {
                disableClose: false,
                autoFocus: false,
                width: '350px',
                panelClass: 'overlay-panel',
                data: data,
            });
            columnFilteringDialog
                .afterClosed()
                .pipe(operators.take(1))
                .subscribe(function (response) {
                if (response && response.action === 'Ok') {
                    _this.filterByColumn(response);
                    _this.sortByTable(response);
                }
            });
        };
        //#endregion
        //#region After FilterColumns response
        AdvancedMaterialTableComponent.prototype.filterByColumn = function (response) {
            if (!response || !response.selectedColumn) {
                return;
            }
            var column = this.tableColumnList.find(function (x) { return x.Field === response.selectedColumn.Field; });
            if (column) {
                column.FilterValues = response.selectedColumn.FilterValues;
            }
            this.applyFilters();
        };
        AdvancedMaterialTableComponent.prototype.sortByTable = function (response) {
            if (response.sortingHasChanged === false) {
                return;
            }
            var columnName = response.selectedColumn.Field;
            var direction = response.selectedColumn.SortDirection;
            this.tableColumnList.forEach(function (column) {
                column.SortDirection = column.Field !== columnName ? undefined : direction;
            });
            this.sortColumns();
        };
        //#endregion
        //#region Print and Export
        AdvancedMaterialTableComponent.prototype.sendToPrinter = function () {
            var selectedData = this.getDataToExportPrint();
            var colNames = this.getDisplayedColumnNames();
            var table = TableBuilderHelper.buildTable(selectedData, this.displayedColumns, colNames);
            if (table) {
                var newWin = window.open('#');
                if (!newWin)
                    return;
                newWin.document.write(TableBuilderHelper.printPageBuilderDefault(table));
                newWin.print();
                newWin.close();
            }
        };
        // TODO: Create a service for that, currently being used in advanced table
        AdvancedMaterialTableComponent.prototype.exportToExcel = function () {
            // const tableTitle = TableTags.Table;
            // const selectedData = this.getSelectedDataWithDisplayedColumnsOnly();
            // const colNames = this.getDisplayedColumnNames();
            // // generate a worksheet
            // const ws = xlsx.utils.aoa_to_sheet([colNames]);
            // xlsx.utils.sheet_add_json(ws, selectedData, {
            //     header: this.displayedColumns.slice(1), // remove the 'select' column
            //     skipHeader: true,
            //     origin: 1,
            // });
            // // add to workbook
            // const wb = xlsx.utils.book_new();
            // xlsx.utils.book_append_sheet(wb, ws, tableTitle);
            // // write workbook and force a download
            // xlsx.writeFile(wb, `${tableTitle}.xls`, {
            //     type: 'array',
            //     bookType: 'xls',
            // });
        };
        AdvancedMaterialTableComponent.prototype.getDataToExportPrint = function () {
            if (!this.selection.isEmpty()) {
                return this.selection.selected;
            }
            if (!this.dataSource.sort) {
                return this.selection.selected;
            }
            return this.dataSource.sortData(this.dataSource.filteredData, this.dataSource.sort);
        };
        AdvancedMaterialTableComponent.prototype.getSelectedDataWithDisplayedColumnsOnly = function () {
            var _this = this;
            var selectedData = this.getDataToExportPrint();
            return ___namespace.map(selectedData, function (obj) {
                return ___namespace.pick(obj, _this.displayedColumns);
            });
        };
        AdvancedMaterialTableComponent.prototype.getDisplayedColumnNames = function () {
            return this.tableColumns.filter(function (column) { return column.Display === true; }).map(function (column) { return column.Title; });
        };
        //#endregion
        //#region LocalStorage
        AdvancedMaterialTableComponent.prototype.loadFromStorage = function () {
            var e_2, _a;
            if (!this.tableConfiguration || !this.tableConfiguration.LocalStorageKey) {
                return;
            }
            var localStorageColumns = this.localStorageService.getAsJson(this.tableConfiguration.LocalStorageKey);
            if (!localStorageColumns) {
                return;
            }
            var tableColumnList = ___namespace.cloneDeep(this.tableColumns);
            var _loop_2 = function (obj) {
                var index = localStorageColumns.findIndex(function (i) { return i.Field === obj.Field; });
                if (index !== -1) {
                    var previousIndex = this_1.tableColumns.findIndex(function (i) { return i.Field === obj.Field; });
                    // update the displayed property
                    this_1.tableColumns[previousIndex].Display = localStorageColumns[index].Display;
                    // rearange columns
                    this_1.moveItemInArray(this_1.tableColumns, previousIndex, index);
                }
            };
            var this_1 = this;
            try {
                for (var tableColumnList_1 = __values(tableColumnList), tableColumnList_1_1 = tableColumnList_1.next(); !tableColumnList_1_1.done; tableColumnList_1_1 = tableColumnList_1.next()) {
                    var obj = tableColumnList_1_1.value;
                    _loop_2(obj);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (tableColumnList_1_1 && !tableColumnList_1_1.done && (_a = tableColumnList_1.return)) _a.call(tableColumnList_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
        };
        AdvancedMaterialTableComponent.prototype.saveColumnConfig = function () {
            if (!this.tableConfiguration || !this.tableConfiguration.LocalStorageKey) {
                return;
            }
            this.localStorageService.setAsJson(this.tableConfiguration.LocalStorageKey, this.tableColumns);
        };
        AdvancedMaterialTableComponent.prototype.moveItemInArray = function (array, previousIndex, index) {
            var temp = array[previousIndex];
            array[previousIndex] = array[index];
            array[index] = temp;
        };
        //#endregion
        //#region Paginator
        AdvancedMaterialTableComponent.prototype.localizePaginator = function () {
            if (!this.tableConfiguration.AllowPagination) {
                return;
            }
            if (this.paginator === undefined) {
                return;
            }
            this.paginator._intl.firstPageLabel = 'First Page';
            this.paginator._intl.previousPageLabel = 'Previous Page';
            this.paginator._intl.nextPageLabel = 'Next Page';
            this.paginator._intl.lastPageLabel = 'Last Page';
            this.paginator._intl.itemsPerPageLabel = 'Items per Page';
            this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
                if (length === 0 || pageSize === 0) {
                    return "0 of " + length;
                }
                length = Math.max(length, 0);
                var startIndex = page * pageSize;
                // If the start index exceeds the list length, do not try and fix the end index to the end.
                var endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
                return startIndex + 1 + " - " + endIndex + " of " + length;
            };
        };
        //#endregion
        //#region ClassNames
        AdvancedMaterialTableComponent.prototype.getRowClassName = function () {
            var hasImageColumn = this.tableColumns.find(function (c) { return c.ColumnType === exports.ColumnType.Image; });
            if (hasImageColumn) {
                return 'row-with-image';
            }
            return '';
        };
        AdvancedMaterialTableComponent.prototype.getColumnClassName = function (column) {
            switch (column.ColumnType) {
                case exports.ColumnType.Actions:
                    return 'actions';
                case exports.ColumnType.Icon:
                    return 'icons';
                case exports.ColumnType.Image:
                    return 'images';
            }
            return '';
        };
        return AdvancedMaterialTableComponent;
    }());
    AdvancedMaterialTableComponent.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: AdvancedMaterialTableComponent, deps: [{ token: i1__namespace.MatDialog }, { token: LocalStorageService }, { token: i0__namespace.ChangeDetectorRef }], target: i0__namespace.ɵɵFactoryTarget.Component });
    AdvancedMaterialTableComponent.ɵcmp = i0__namespace.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "12.2.12", type: AdvancedMaterialTableComponent, selector: "ngx-advanced-material-table", inputs: { tableConfiguration: "tableConfiguration", actionConfiguration: "actionConfiguration", tableColumns: "tableColumns", data: "data", selectedData: "selectedData" }, outputs: { actionSelected: "actionSelected", iconClicked: "iconClicked", rowSelected: "rowSelected", numberChange: "numberChange", catalogueClicked: "catalogueClicked", searchCatalogueClicked: "searchCatalogueClicked", clearCatalogueClicked: "clearCatalogueClicked", hyperLinkClicked: "hyperLinkClicked" }, viewQueries: [{ propertyName: "paginator", first: true, predicate: i7$1.MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: i10.MatSort, descendants: true }], ngImport: i0__namespace, template: "<div>\n    <div class=\"table-top-panel\" *ngIf=\"tableConfiguration.AllowFilter || tableConfiguration.AllowActions\">\n        <div class=\"table-filter\">\n            <ng-container *ngIf=\"tableConfiguration.AllowFilter\">\n                <mat-form-field>\n                    <input\n                        matInput\n                        id=\"{{ tableConfiguration.Id }}-table-filter-field\"\n                        (keyup)=\"applyMainFilter($event.target)\"\n                        i18n-placeholder=\"@@placeholder-text-filterResult\"\n                        placeholder=\"Filter on results...\"\n                    />\n                </mat-form-field>\n            </ng-container>\n        </div>\n\n        <div class=\"table-actions\" *ngIf=\"tableConfiguration.AllowActions\">\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-clearAllFilters\"\n                onclick=\"this.blur()\"\n                (click)=\"clearAllFilters()\"\n                [matTooltip]=\"templateClearAllFilters.innerText\"\n            >\n                <mat-icon>filter_list_off</mat-icon>\n            </button>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-showColumns\"\n                [matMenuTriggerFor]=\"visibleColumnsMenu\"\n                [matTooltip]=\"templateShowHide.innerText\"\n            >\n                <mat-icon>view_column</mat-icon>\n            </button>\n\n            <mat-menu #visibleColumnsMenu=\"matMenu\">\n                <ng-template matMenuContent>\n                    <div id=\"{{ tableConfiguration.Id }}-table-columns-checkbox\">\n                        <div\n                            mat-menu-item\n                            *ngFor=\"let column of tableColumns; let i = index\"\n                            (click)=\"onColumnChange(i, $event); $event.stopPropagation()\"\n                        >\n                            <mat-icon *ngIf=\"column.Display\" color=\"accent\">check_box</mat-icon>\n                            <mat-icon *ngIf=\"!column.Display\">check_box_outline_blank</mat-icon>\n                            <span>{{ column.Title }}</span>\n                        </div>\n                    </div>\n                </ng-template>\n            </mat-menu>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-export-to-excel-button\"\n                [matTooltip]=\"templateExportCsv.innerText\"\n                (click)=\"exportToExcel()\"\n                [disabled]=\"noRowsDisplayed\"\n            >\n                <mat-icon>file_download</mat-icon>\n            </button>\n\n            <button\n                mat-icon-button\n                id=\"{{ tableConfiguration.Id }}-table-print-button\"\n                (click)=\"sendToPrinter()\"\n                [matTooltip]=\"templatePrint.innerText\"\n                [disabled]=\"noRowsDisplayed\"\n            >\n                <mat-icon>print</mat-icon>\n            </button>\n\n            <template #templateShowHide i18n=\"@@table-tooltip-grid-showColumns\">Select visible columns</template>\n            <template #templateExportCsv i18n=\"@@table-tooltip-export-csv\">Export to Excel</template>\n            <template #templateClearAllFilters i18n=\"@@table-tooltip-clear-all-filters\">Clear filters and sorting</template>\n            <template #templatePrint i18n=\"@@action-btn-print\">Print</template>\n        </div>\n    </div>\n\n    <div class=\"table-pagination\" *ngIf=\"tableConfiguration.AllowPagination\">\n        <mat-paginator\n            [pageSizeOptions]=\"[10, 25, 50, 100]\"\n            id=\"{{ tableConfiguration.Id }}-table-paginator\"\n            showFirstLastButtons\n        ></mat-paginator>\n    </div>\n\n    <mat-table\n        id=\"{{ tableConfiguration.Id }}-table\"\n        [dataSource]=\"dataSource\"\n        matSort\n        matSortDisableClear=\"false\"\n        cdkDropListGroup\n        cdkDropList\n        cdkDropListLockAxis=\"x\"\n        cdkDropListOrientation=\"horizontal\"\n        (cdkDropListDropped)=\"headerDropListDropped($event)\"\n    >\n        <!-- Select Check Box Column -->\n        <ng-container matColumnDef=\"select\">\n            <mat-header-cell *matHeaderCellDef>\n                <mat-checkbox\n                    *ngIf=\"tableConfiguration.MultipleSelect\"\n                    (change)=\"$event ? masterToggle() : null\"\n                    [checked]=\"selection.hasValue() && isAllSelected()\"\n                    [indeterminate]=\"selection.hasValue() && !isAllSelected()\"\n                >\n                </mat-checkbox>\n            </mat-header-cell>\n            <mat-cell *matCellDef=\"let row\">\n                <mat-checkbox\n                    (click)=\"$event.stopPropagation()\"\n                    (change)=\"$event ? onRowChecked(row) : null\"\n                    [checked]=\"selection.isSelected(row)\"\n                >\n                </mat-checkbox>\n            </mat-cell>\n        </ng-container>\n\n        <ng-container *ngFor=\"let column of tableColumns; let i = index\" matColumnDef=\"{{ column.Field }}\">\n            <mat-header-cell\n                *matHeaderCellDef\n                cdkDrag\n                (cdkDragStarted)=\"headerDragStarted(i)\"\n                [cdkDragData]=\"{ name: column.Field }\"\n                [cdkDragDisabled]=\"!canColumnBeMoved(column)\"\n                [ngClass]=\"getColumnClassName(column)\"\n                [matTooltip]=\"column.Title\"\n            >\n                <ng-container *ngIf=\"isFilteringEnabledOnColumn(column)\">\n                    <span mat-sort-header [class.selected]=\"hasFiltersOrSortingEnabled(column)\">{{ column.Title }}</span>\n                    <button\n                        mat-icon-button\n                        disableRipple\n                        onclick=\"this.blur()\"\n                        (click)=\"openFilterDialog(column)\"\n                        [disabled]=\"noRowsDisplayed\"\n                        [class.selected]=\"hasFiltersOrSortingEnabled(column)\"\n                    >\n                        <mat-icon>filter_list</mat-icon>\n                    </button>\n                </ng-container>\n            </mat-header-cell>\n            <mat-cell\n                *matCellDef=\"let element; let rowIndex = index\"\n                [ngClass]=\"getColumnClassName(column)\"\n                (click)=\"isCellClickable(column) ? onRowChecked(element) : null\"\n            >\n                <div [matTooltip]=\"getToolTip(element, column)\">\n                    <ng-container [ngSwitch]=\"column.ColumnType\">\n                        <!-- DateTime -->\n                        <span *ngSwitchCase=\"columnType.DateTime\"> {{ getContent(column, element) }}</span>\n                        <!-- Date -->\n                        <span *ngSwitchCase=\"columnType.Date\"> {{ getContent(column, element) }}</span>\n                        <!-- Time -->\n                        <span *ngSwitchCase=\"columnType.Time\"> {{ getContent(column, element) }}</span>\n                        <!-- String -->\n                        <span *ngSwitchCase=\"columnType.String\"> {{ getContent(column, element) }}</span>\n                        <!-- Link -->\n                        <span *ngSwitchCase=\"columnType.Link\" (click)=\"onHyperLinkClicked(element, column)\">\n                            <a href=\"{{ getContent(column, element) }}\" target=\"_blank\" rel=\"noopener\">{{ getContent(column, element) }}</a>\n                        </span>\n                        <!-- Image -->\n                        <div *ngSwitchCase=\"columnType.Image\">\n                            <img src=\"{{ getContent(column, element) }}\" alt=\"image\" />\n                        </div>\n                        <!-- Actions -->\n                        <!-- <ng-container *ngSwitchCase=\"columnType.Actions\">\n                            <app-advance-table-row-menu\n                                [rowData]=\"element\"\n                                [tableRowMenu]=\"RowActionsConfig\"\n                                (actionSelected)=\"onActionSelected($event)\"\n                            ></app-advance-table-row-menu>\n                        </ng-container> -->\n                        <!-- Dropdown -->\n                        <!-- <ng-container *ngSwitchCase=\"columnType.DropDown\">\n                            <app-advanced-table-row-dropdown\n                                [rowData]=\"element\"\n                                [columnData]=\"column\"\n                                [tableRowDropDown]=\"RowDropDownConfig\"\n                                (dropDownSelected)=\"onDropDownSelected($event)\"\n                            ></app-advanced-table-row-dropdown>\n                        </ng-container> -->\n                        <!-- Icon -->\n                        <ng-container *ngSwitchCase=\"columnType.Icon\">\n                            <button\n                                [id]=\"column.Title + '-' + element[column.IdField!]\"\n                                mat-icon-button\n                                (click)=\"iconClick(element, column)\"\n                            >\n                                <mat-icon> {{ column.MatIconName }}</mat-icon>\n                                {{ getContent(column, element) }}\n                            </button>\n                        </ng-container>\n                        <!-- Number Input -->\n                        <ng-container *ngSwitchCase=\"columnType.NumberInput\">\n                            <mat-form-field floatLabel=\"never\">\n                                <input\n                                    matInput\n                                    onlyNumbers\n                                    type=\"number\"\n                                    [min]=\"getMinValueForNumberInput(element, column)\"\n                                    [max]=\"getMaxValueForNumberInput(element, column)\"\n                                    (change)=\"numberInputChange(element, column, $event)\"\n                                    [value]=\"element[column.Field]\"\n                                />\n                                <!-- Suffix -->\n                                <span matSuffix class=\"suffix\" *ngIf=\"column.Suffix\">\n                                    {{ element[column.Suffix.Field] }}\n                                </span>\n                            </mat-form-field>\n                        </ng-container>\n                    </ng-container>\n                    <!-- Suffix -->\n                    <span class=\"suffix\" *ngIf=\"column.Suffix && column.ColumnType !== columnType.NumberInput\">\n                        {{ element[column.Suffix.Field] }}\n                    </span>\n                </div>\n            </mat-cell>\n        </ng-container>\n\n        <mat-header-row *matHeaderRowDef=\"displayedColumns\"></mat-header-row>\n        <mat-row\n            *matRowDef=\"let row; columns: displayedColumns\"\n            id=\"{{ row.Id }}\"\n            [ngClass]=\"getRowClassName()\"\n            (dblclick)=\"onDoubleClick(row)\"\n        ></mat-row>\n    </mat-table>\n\n    <div *ngIf=\"noRowsDisplayed\" class=\"no-records\">\n        <span i18n=\"@@table-noResultFound\">No matching records found</span>\n    </div>\n</div>\n", styles: [".mat-table{border:1px solid rgba(0,0,0,.12);border-bottom:0}.mat-header-row{min-height:40px;height:40px}.mat-row{min-height:40px;height:40px;align-items:stretch}.mat-row:hover{background-color:#4d74a8}.mat-row:hover .mat-cell,.mat-row:hover .mat-icon{color:#fff}.mat-row.row-with-image{height:55px}.mat-row .mat-cell>div{width:100%;display:flex;align-items:center}.mat-row .mat-cell .mat-form-field{min-width:50%}.mat-row .mat-cell img{height:55px;min-width:100px;margin:0}.mat-header-cell,.mat-cell{min-height:40px;border-right:1px solid rgba(0,0,0,.12);padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mat-header-cell.mat-column-select,.mat-cell.mat-column-select{padding:0 8px;width:20px;flex:none;justify-content:center}.mat-header-cell:last-child,.mat-cell:last-child{border-right:0}.no-records{height:48px;display:flex;align-items:center;justify-content:center;background:white}.table-top-panel{display:flex;justify-content:space-between;height:1.25em;padding:1em 0 1.5em}.table-actions{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination{display:flex;justify-content:flex-end;align-items:center;flex:0 1 auto}.table-pagination h4{margin:0;text-transform:uppercase;font-weight:bold}.table-pagination .mat-paginator{background:transparent}.table-pagination .mat-form-field{width:4em;margin:0 .2em 0 .5em}.mat-header-cell{display:flex;align-items:inherit;align-content:stretch}.mat-header-cell .mat-icon{font-size:1em}.mat-header-cell span{flex:1 1 auto;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:bold}.mat-header-cell.icons,.mat-header-cell.actions,.mat-cell.icons,.mat-cell.actions{padding:0;width:40px;flex:none;justify-content:center}.mat-header-cell.images,.mat-cell.images{padding:2px;min-width:100px;flex:none;justify-content:center}\n"], components: [{ type: i5__namespace.MatFormField, selector: "mat-form-field", inputs: ["color", "floatLabel", "appearance", "hideRequiredMarker", "hintLabel"], exportAs: ["matFormField"] }, { type: i3__namespace.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { type: i4__namespace.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { type: i6__namespace$1.MatMenu, selector: "mat-menu", exportAs: ["matMenu"] }, { type: i6__namespace$1.MatMenuItem, selector: "[mat-menu-item]", inputs: ["disabled", "disableRipple", "role"], exportAs: ["matMenuItem"] }, { type: i7__namespace$1.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }, { type: i8__namespace$1.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { type: i7__namespace.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex", "aria-label", "aria-labelledby", "id", "labelPosition", "name", "required", "checked", "disabled", "indeterminate", "aria-describedby", "value"], outputs: ["change", "indeterminateChange"], exportAs: ["matCheckbox"] }, { type: i10__namespace.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "arrowPosition", "sortActionDescription", "disableClear", "mat-sort-header", "start"], exportAs: ["matSortHeader"] }, { type: i8__namespace$1.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { type: i8__namespace$1.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }], directives: [{ type: i11__namespace.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i9__namespace.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["id", "disabled", "required", "type", "value", "readonly", "placeholder", "errorStateMatcher", "aria-describedby"], exportAs: ["matInput"] }, { type: i13__namespace.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { type: i6__namespace$1.MatMenuTrigger, selector: "[mat-menu-trigger-for], [matMenuTriggerFor]", exportAs: ["matMenuTrigger"] }, { type: i6__namespace$1.MatMenuContent, selector: "ng-template[matMenuContent]" }, { type: i11__namespace.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i10__namespace.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortStart", "matSortDirection", "matSortDisableClear", "matSortActive"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { type: i14__namespace.CdkDropListGroup, selector: "[cdkDropListGroup]", inputs: ["cdkDropListGroupDisabled"], exportAs: ["cdkDropListGroup"] }, { type: i14__namespace.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "id", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListAutoScrollDisabled", "cdkDropListOrientation", "cdkDropListLockAxis", "cdkDropListData", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { type: i8__namespace$1.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { type: i8__namespace$1.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { type: i8__namespace$1.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { type: i8__namespace$1.MatCellDef, selector: "[matCellDef]" }, { type: i8__namespace$1.MatCell, selector: "mat-cell, td[mat-cell]" }, { type: i14__namespace.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragDisabled", "cdkDragStartDelay", "cdkDragLockAxis", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragBoundary", "cdkDragRootElement", "cdkDragPreviewContainer", "cdkDragData", "cdkDragFreeDragPosition"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { type: i11__namespace.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i11__namespace.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i11__namespace.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i5__namespace.MatSuffix, selector: "[matSuffix]" }, { type: i8__namespace$1.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { type: i8__namespace$1.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: AdvancedMaterialTableComponent, decorators: [{
                type: i0.Component,
                args: [{
                        selector: 'ngx-advanced-material-table',
                        templateUrl: './ngx-advanced-material-table.component.html',
                        styleUrls: ['./ngx-advanced-material-table.component.scss'],
                    }]
            }], ctorParameters: function () { return [{ type: i1__namespace.MatDialog }, { type: LocalStorageService }, { type: i0__namespace.ChangeDetectorRef }]; }, propDecorators: { tableConfiguration: [{
                    type: i0.Input
                }], actionConfiguration: [{
                    type: i0.Input
                }], tableColumns: [{
                    type: i0.Input
                }], data: [{
                    type: i0.Input
                }], selectedData: [{
                    type: i0.Input
                }], actionSelected: [{
                    type: i0.Output
                }], iconClicked: [{
                    type: i0.Output
                }], rowSelected: [{
                    type: i0.Output
                }], numberChange: [{
                    type: i0.Output
                }], catalogueClicked: [{
                    type: i0.Output
                }], searchCatalogueClicked: [{
                    type: i0.Output
                }], clearCatalogueClicked: [{
                    type: i0.Output
                }], hyperLinkClicked: [{
                    type: i0.Output
                }], paginator: [{
                    type: i0.ViewChild,
                    args: [i7$1.MatPaginator]
                }], sort: [{
                    type: i0.ViewChild,
                    args: [i10.MatSort]
                }] } });

    var MaterialModule = /** @class */ (function () {
        function MaterialModule() {
        }
        return MaterialModule;
    }());
    MaterialModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: MaterialModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    MaterialModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: MaterialModule, exports: [table.CdkTableModule,
            i14.DragDropModule,
            i3.MatButtonModule,
            i8.MatButtonToggleModule,
            i7.MatCheckboxModule,
            i1.MatDialogModule,
            i4.MatIconModule,
            i9.MatInputModule,
            i6$1.MatMenuModule,
            i7$1.MatPaginatorModule,
            core.MatRippleModule,
            i10.MatSortModule,
            i8$1.MatTableModule,
            i13.MatTooltipModule,
            i6.ScrollingModule] });
    MaterialModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: MaterialModule, providers: [], imports: [table.CdkTableModule,
            i14.DragDropModule,
            i3.MatButtonModule,
            i8.MatButtonToggleModule,
            i7.MatCheckboxModule,
            i1.MatDialogModule,
            i4.MatIconModule,
            i9.MatInputModule,
            i6$1.MatMenuModule,
            i7$1.MatPaginatorModule,
            core.MatRippleModule,
            i10.MatSortModule,
            i8$1.MatTableModule,
            i13.MatTooltipModule,
            i6.ScrollingModule] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: MaterialModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        exports: [
                            table.CdkTableModule,
                            i14.DragDropModule,
                            i3.MatButtonModule,
                            i8.MatButtonToggleModule,
                            i7.MatCheckboxModule,
                            i1.MatDialogModule,
                            i4.MatIconModule,
                            i9.MatInputModule,
                            i6$1.MatMenuModule,
                            i7$1.MatPaginatorModule,
                            core.MatRippleModule,
                            i10.MatSortModule,
                            i8$1.MatTableModule,
                            i13.MatTooltipModule,
                            i6.ScrollingModule,
                        ],
                        providers: [],
                    }]
            }] });

    var NgxAdvancedMaterialTableModule = /** @class */ (function () {
        function NgxAdvancedMaterialTableModule() {
        }
        return NgxAdvancedMaterialTableModule;
    }());
    NgxAdvancedMaterialTableModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: NgxAdvancedMaterialTableModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    NgxAdvancedMaterialTableModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: NgxAdvancedMaterialTableModule, declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe], imports: [i11.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, MaterialModule], exports: [AdvancedMaterialTableComponent] });
    NgxAdvancedMaterialTableModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: NgxAdvancedMaterialTableModule, imports: [[i11.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, MaterialModule]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.12", ngImport: i0__namespace, type: NgxAdvancedMaterialTableModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [i11.CommonModule, i2.FormsModule, i2.ReactiveFormsModule, MaterialModule],
                        declarations: [AdvancedMaterialTableComponent, FilterColumnsComponent, FilterColumnValuesPipe],
                        exports: [AdvancedMaterialTableComponent],
                        entryComponents: [FilterColumnsComponent],
                    }]
            }] });

    /*
     * Public API Surface of ngx-advanced-material-table
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AdvancedMaterialTableComponent = AdvancedMaterialTableComponent;
    exports.FilterColumnsComponent = FilterColumnsComponent;
    exports.NgxAdvancedMaterialTableModule = NgxAdvancedMaterialTableModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ngx-advanced-material-table.umd.js.map
