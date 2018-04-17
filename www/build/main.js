webpackJsonp([2],{

/***/ 129:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/display-to-do/display-to-do.module": [
		475,
		1
	],
	"../pages/to-do-list/to-do-list.module": [
		476,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initFrappe;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_frappejs__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_frappejs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_frappejs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_frappejs_common__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_frappejs_common___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_frappejs_common__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_frappejs_models__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_frappejs_models___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_frappejs_models__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_frappejs_backends_http__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_frappejs_backends_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_frappejs_backends_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_frappejs_utils_observable__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_frappejs_utils_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_frappejs_utils_observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_node_fetch__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_node_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_node_fetch__);










let server = 'localhost:8000';

async function initFrappe(serv) {
	if(serv) {
		server = serv;
	}
	Object.assign(window, {
	  frappe: __WEBPACK_IMPORTED_MODULE_0_frappejs___default.a
	});
	__WEBPACK_IMPORTED_MODULE_0_frappejs___default.a.fetch = __WEBPACK_IMPORTED_MODULE_6_node_fetch___default.a.bind();
	
	__WEBPACK_IMPORTED_MODULE_0_frappejs___default.a.init();
	__WEBPACK_IMPORTED_MODULE_0_frappejs___default.a.registerLibs(__WEBPACK_IMPORTED_MODULE_1_frappejs_common___default.a);
	__WEBPACK_IMPORTED_MODULE_0_frappejs___default.a.registerModels(__WEBPACK_IMPORTED_MODULE_2_frappejs_models___default.a, 'client');
	__WEBPACK_IMPORTED_MODULE_0_frappejs___default.a.db = await new __WEBPACK_IMPORTED_MODULE_3_frappejs_backends_http___default.a({server: server});
	const socket = __WEBPACK_IMPORTED_MODULE_4_socket_io_client___default.a.connect('http://' + server);
	__WEBPACK_IMPORTED_MODULE_0_frappejs___default.a.db.bindSocketClient(socket);
	
	__WEBPACK_IMPORTED_MODULE_0_frappejs___default.a.docs = new __WEBPACK_IMPORTED_MODULE_5_frappejs_utils_observable___default.a();
}



/***/ }),

/***/ 172:
/***/ (function(module, exports) {

const number_formats = {
    "#,###.##": { fraction_sep: ".", group_sep: ",", precision: 2 },
    "#.###,##": { fraction_sep: ",", group_sep: ".", precision: 2 },
    "# ###.##": { fraction_sep: ".", group_sep: " ", precision: 2 },
    "# ###,##": { fraction_sep: ",", group_sep: " ", precision: 2 },
    "#'###.##": { fraction_sep: ".", group_sep: "'", precision: 2 },
    "#, ###.##": { fraction_sep: ".", group_sep: ", ", precision: 2 },
    "#,##,###.##": { fraction_sep: ".", group_sep: ",", precision: 2 },
    "#,###.###": { fraction_sep: ".", group_sep: ",", precision: 3 },
    "#.###": { fraction_sep: "", group_sep: ".", precision: 0 },
    "#,###": { fraction_sep: "", group_sep: ",", precision: 0 },
}

module.exports = {
    // parse a formatted number string
    // from "4,555,000.34" -> 4555000.34
    parse_number(number, format='#,###.##') {
        if (!number) {
            return 0;
        }
        if (typeof number === 'number') {
            return number;
        }
        const info = this.get_format_info(format);
        return parseFloat(this.remove_separator(number, info.group_sep));
    },

    format_number(number, format = '#,###.##', precision = null) {
        if (!number) {
            number = 0;
        }
        let info = this.get_format_info(format);
        if (precision) {
            info.precision = precision;
        }
        let is_negative = false;

        number = this.parse_number(number);
        if (number < 0) {
            is_negative = true;
        }
        number = Math.abs(number);
        number = number.toFixed(info.precision);

        var parts = number.split('.');

        // get group position and parts
        var group_position = info.group_sep ? 3 : 0;

        if (group_position) {
            var integer = parts[0];
            var str = '';
            var offset = integer.length % group_position;
            for (var i = integer.length; i >= 0; i--) {
                var l = this.remove_separator(str, info.group_sep).length;
                if (format == "#,##,###.##" && str.indexOf(",") != -1) { // INR
                    group_position = 2;
                    l += 1;
                }

                str += integer.charAt(i);

                if (l && !((l + 1) % group_position) && i != 0) {
                    str += info.group_sep;
                }
            }
            parts[0] = str.split("").reverse().join("");
        }
        if (parts[0] + "" == "") {
            parts[0] = "0";
        }

        // join decimal
        parts[1] = (parts[1] && info.fraction_sep) ? (info.fraction_sep + parts[1]) : "";

        // join
        return (is_negative ? "-" : "") + parts[0] + parts[1];
    },

    get_format_info(format) {
        let format_info = number_formats[format];

        if (!format_info) {
            throw `Unknown number format "${format}"`;
        }

        return format_info;
    },

    round(num, precision) {
        var is_negative = num < 0 ? true : false;
        var d = parseInt(precision || 0);
        var m = Math.pow(10, d);
        var n = +(d ? Math.abs(num) * m : Math.abs(num)).toFixed(8); // Avoid rounding errors
        var i = Math.floor(n), f = n - i;
        var r = ((!precision && f == 0.5) ? ((i % 2 == 0) ? i : i + 1) : Math.round(n));
        r = d ? r / m : r;
        return is_negative ? -r : r;
    },

    remove_separator(text, sep) {
        return text.replace(new RegExp(sep === "." ? "\\." : sep, "g"), '');
    }
};


/***/ }),

/***/ 27:
/***/ (function(module, exports) {


module.exports = {
    async init() {
        if (this._initialized) return;
        this.initConfig();
        this.initGlobals();
        this._initialized = true;
    },

    initConfig() {
        this.config = {
            backend: 'sqlite',
            port: 8000
        };
    },

    initGlobals() {
        this.metaCache = {};
        this.models = {};
        this.forms = {};
        this.views = {};
        this.flags = {};
        this.methods = {};
        // temp params while calling routes
        this.params = {};
    },

    registerLibs(common) {
        // add standard libs and utils to frappe
        common.initLibs(this);
    },

    registerModels(models, type) {
        // register models from app/models/index.js
        const toAdd = Object.assign({}, models.models);

        // post process based on type
        if (models[type]) {
            models[type](toAdd);
        }

        Object.assign(this.models, toAdd);
    },

    registerView(view, name, module) {
        if (!this.views[view]) this.views[view] = {};
        this.views[view][name] = module;
    },

    registerMethod({method, handler}) {
        this.methods[method] = handler;
        if (this.app) {
            // add to router if client-server
            this.app.post(`/api/method/${method}`, this.asyncHandler(async function(request, response) {
                const data = await handler(request.body);
                response.json(data);
            }));
        }
    },

    call({method, type, args}) {
        if (this.methods[method]) {
            return this.methods[method](args);
        } else {
            throw `${method} not found`;
        }
    },

    addToCache(doc) {
        if (!this.docs) return;

        // add to `docs` cache
        if (doc.doctype && doc.name) {
            if (!this.docs[doc.doctype]) {
                this.docs[doc.doctype] = {};
            }
            this.docs[doc.doctype][doc.name] = doc;

            // singles available as first level objects too
            if (doc.doctype === doc.name) {
                this[doc.name] = doc;
            }

            // propogate change to `docs`
            doc.on('change', params => {
                this.docs.trigger('change', params);
            });
        }
    },

    isDirty(doctype, name) {
        return (this.docs && this.docs[doctype] && this.docs[doctype][name]
            && this.docs[doctype][name]._dirty) || false;
    },

    getDocFromCache(doctype, name) {
        if (this.docs && this.docs[doctype] && this.docs[doctype][name]) {
            return this.docs[doctype][name];
        }
    },

    getMeta(doctype) {
        if (!this.metaCache[doctype]) {
            let model = this.models[doctype];
            if (!model) {
                throw `${doctype} is not a registered doctype`;
            }
            let metaClass = model.metaClass || this.BaseMeta;
            this.metaCache[doctype] = new metaClass(model);
        }

        return this.metaCache[doctype];
    },

    async getDoc(doctype, name) {
        let doc = this.getDocFromCache(doctype, name);
        if (!doc) {
            doc = new (this.getDocumentClass(doctype))({doctype:doctype, name: name});
            await doc.load();
            this.addToCache(doc);
        }
        return doc;
    },

    getDocumentClass(doctype) {
        const meta = this.getMeta(doctype);
        return meta.documentClass || this.BaseDocument;
    },

    async getSingle(doctype) {
        return await this.getDoc(doctype, doctype);
    },

    async getDuplicate(doc) {
        const newDoc = await this.getNewDoc(doc.doctype);
        for (let field of this.getMeta(doc.doctype).getValidFields()) {
            if (['name', 'submitted'].includes(field.fieldname)) continue;
            if (field.fieldtype === 'Table') {
                newDoc[field.fieldname] = (doc[field.fieldname] || []).map(d => {
                    let newd = Object.assign({}, d);
                    newd.name = '';
                    return newd;
                });
            } else {
                newDoc[field.fieldname] = doc[field.fieldname];
            }
        }
        return newDoc;
    },

    async getNewDoc(doctype) {
        let doc = this.newDoc({doctype: doctype});
        doc._notInserted = true;
        doc.name = this.getRandomString();
        this.addToCache(doc);
        return doc;
    },

    newDoc(data) {
        let doc = new (this.getDocumentClass(data.doctype))(data);
        doc.setDefaults();
        return doc;
    },

    async insert(data) {
        return await (this.newDoc(data)).insert();
    },

    async syncDoc(data) {
        let doc;
        if (await this.db.exists(data.doctype, data.name)) {
            doc = await this.getDoc(data.doctype, data.name);
            Object.assign(doc, data);
            await doc.update();
        } else {
            doc = this.newDoc(data);
            await doc.insert();
        }
    },

    login(user='guest', user_key) {
        this.session = {user: user};
    },

    close() {
        this.db.close();

        if (this.server) {
            this.server.close();
        }
    }
};


/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(372);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_to_do_list_to_do_list__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_display_to_do_display_to_do__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_popover_popover__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__frappe__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AppModule = /** @class */ (function () {
    function AppModule() {
        Object(__WEBPACK_IMPORTED_MODULE_11__frappe__["a" /* default */])();
    }
    ;
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_to_do_list_to_do_list__["a" /* ToDoListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_display_to_do_display_to_do__["a" /* DisplayToDoPage */],
                __WEBPACK_IMPORTED_MODULE_10__components_popover_popover__["a" /* PopoverComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/display-to-do/display-to-do.module#DisplayToDoPageModule', name: 'DisplayToDoPage', segment: 'display-to-do', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/to-do-list/to-do-list.module#ToDoListPageModule', name: 'ToDoListPage', segment: 'to-do-list', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_to_do_list_to_do_list__["a" /* ToDoListPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_display_to_do_display_to_do__["a" /* DisplayToDoPage */],
                __WEBPACK_IMPORTED_MODULE_10__components_popover_popover__["a" /* PopoverComponent */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_network__["a" /* Network */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 401:
/***/ (function(module, exports, __webpack_require__) {

const utils = __webpack_require__(402);
const number_format = __webpack_require__(172);
const format = __webpack_require__(403);
const errors = __webpack_require__(406);
const BaseDocument = __webpack_require__(55);
const BaseMeta = __webpack_require__(408);

module.exports = {
    initLibs(frappe) {
        Object.assign(frappe, utils);
        Object.assign(frappe, number_format);
        Object.assign(frappe, format);
        frappe.errors = errors;
        frappe.BaseDocument = BaseDocument;
        frappe.BaseMeta = BaseMeta;
    }
}

/***/ }),

/***/ 402:
/***/ (function(module, exports) {

Array.prototype.equals = function( array ) {
    return this.length == array.length &&
           this.every( function(item,i) { return item == array[i] } );
}

module.exports = {
    slug(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    },

    getRandomString() {
        return Math.random().toString(36).substr(3);
    },

    async sleep(seconds) {
        return new Promise(resolve => {
            setTimeout(resolve, seconds * 1000);
        });
    },

    _(text, args) {
        // should return translated text
        return this.stringReplace(text, args);
    },

    stringReplace(str, args) {
        if (!Array.isArray(args)) {
            args = [args];
        }

        if(str==undefined) return str;

        let unkeyed_index = 0;
        return str.replace(/\{(\w*)\}/g, (match, key) => {
            if (key === '') {
                key = unkeyed_index;
                unkeyed_index++
            }
            if (key == +key) {
                return args[key] !== undefined
                    ? args[key]
                    : match;
            }
        });
    },

    getQueryString(params) {
        if (!params) return '';
        let parts = [];
        for (let key in params) {
            if (key!=null && params[key]!=null) {
                parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
            }
        }
        return parts.join('&');
    },

    asyncHandler(fn) {
        return (req, res, next) => Promise.resolve(fn(req, res, next))
            .catch((err) => {
                console.log(err);
                // handle error
                res.status(err.status_code || 500).send({error: err.message});
            });
    },

};

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

const number_format = __webpack_require__(172);
const markdown = new (__webpack_require__(404).Converter)();
const moment = __webpack_require__(1);
const frappe = __webpack_require__(27);

module.exports = {
    format(value, field) {
        if (typeof field === 'string') {
            field = {fieldtype: field};
        }

        if (field.fieldtype==='Currency') {
            value = number_format.format_number(value);

        } else if (field.fieldtype === 'Text') {
            value = markdown.makeHtml(value || '');

        } else if (field.fieldtype === 'Date') {
            value = moment(value).format(frappe.SystemSettings.dateFormat.toUpperCase());

        } else {
            if (value===null || value===undefined) {
                value = '';
            } else {
                value = value + '';
            }
        }
        return value;
    }
}

/***/ }),

/***/ 405:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 174,
	"./af.js": 174,
	"./ar": 175,
	"./ar-dz": 176,
	"./ar-dz.js": 176,
	"./ar-kw": 177,
	"./ar-kw.js": 177,
	"./ar-ly": 178,
	"./ar-ly.js": 178,
	"./ar-ma": 179,
	"./ar-ma.js": 179,
	"./ar-sa": 180,
	"./ar-sa.js": 180,
	"./ar-tn": 181,
	"./ar-tn.js": 181,
	"./ar.js": 175,
	"./az": 182,
	"./az.js": 182,
	"./be": 183,
	"./be.js": 183,
	"./bg": 184,
	"./bg.js": 184,
	"./bm": 185,
	"./bm.js": 185,
	"./bn": 186,
	"./bn.js": 186,
	"./bo": 187,
	"./bo.js": 187,
	"./br": 188,
	"./br.js": 188,
	"./bs": 189,
	"./bs.js": 189,
	"./ca": 190,
	"./ca.js": 190,
	"./cs": 191,
	"./cs.js": 191,
	"./cv": 192,
	"./cv.js": 192,
	"./cy": 193,
	"./cy.js": 193,
	"./da": 194,
	"./da.js": 194,
	"./de": 195,
	"./de-at": 196,
	"./de-at.js": 196,
	"./de-ch": 197,
	"./de-ch.js": 197,
	"./de.js": 195,
	"./dv": 198,
	"./dv.js": 198,
	"./el": 199,
	"./el.js": 199,
	"./en-au": 200,
	"./en-au.js": 200,
	"./en-ca": 201,
	"./en-ca.js": 201,
	"./en-gb": 202,
	"./en-gb.js": 202,
	"./en-ie": 203,
	"./en-ie.js": 203,
	"./en-il": 204,
	"./en-il.js": 204,
	"./en-nz": 205,
	"./en-nz.js": 205,
	"./eo": 206,
	"./eo.js": 206,
	"./es": 207,
	"./es-do": 208,
	"./es-do.js": 208,
	"./es-us": 209,
	"./es-us.js": 209,
	"./es.js": 207,
	"./et": 210,
	"./et.js": 210,
	"./eu": 211,
	"./eu.js": 211,
	"./fa": 212,
	"./fa.js": 212,
	"./fi": 213,
	"./fi.js": 213,
	"./fo": 214,
	"./fo.js": 214,
	"./fr": 215,
	"./fr-ca": 216,
	"./fr-ca.js": 216,
	"./fr-ch": 217,
	"./fr-ch.js": 217,
	"./fr.js": 215,
	"./fy": 218,
	"./fy.js": 218,
	"./gd": 219,
	"./gd.js": 219,
	"./gl": 220,
	"./gl.js": 220,
	"./gom-latn": 221,
	"./gom-latn.js": 221,
	"./gu": 222,
	"./gu.js": 222,
	"./he": 223,
	"./he.js": 223,
	"./hi": 224,
	"./hi.js": 224,
	"./hr": 225,
	"./hr.js": 225,
	"./hu": 226,
	"./hu.js": 226,
	"./hy-am": 227,
	"./hy-am.js": 227,
	"./id": 228,
	"./id.js": 228,
	"./is": 229,
	"./is.js": 229,
	"./it": 230,
	"./it.js": 230,
	"./ja": 231,
	"./ja.js": 231,
	"./jv": 232,
	"./jv.js": 232,
	"./ka": 233,
	"./ka.js": 233,
	"./kk": 234,
	"./kk.js": 234,
	"./km": 235,
	"./km.js": 235,
	"./kn": 236,
	"./kn.js": 236,
	"./ko": 237,
	"./ko.js": 237,
	"./ky": 238,
	"./ky.js": 238,
	"./lb": 239,
	"./lb.js": 239,
	"./lo": 240,
	"./lo.js": 240,
	"./lt": 241,
	"./lt.js": 241,
	"./lv": 242,
	"./lv.js": 242,
	"./me": 243,
	"./me.js": 243,
	"./mi": 244,
	"./mi.js": 244,
	"./mk": 245,
	"./mk.js": 245,
	"./ml": 246,
	"./ml.js": 246,
	"./mn": 247,
	"./mn.js": 247,
	"./mr": 248,
	"./mr.js": 248,
	"./ms": 249,
	"./ms-my": 250,
	"./ms-my.js": 250,
	"./ms.js": 249,
	"./mt": 251,
	"./mt.js": 251,
	"./my": 252,
	"./my.js": 252,
	"./nb": 253,
	"./nb.js": 253,
	"./ne": 254,
	"./ne.js": 254,
	"./nl": 255,
	"./nl-be": 256,
	"./nl-be.js": 256,
	"./nl.js": 255,
	"./nn": 257,
	"./nn.js": 257,
	"./pa-in": 258,
	"./pa-in.js": 258,
	"./pl": 259,
	"./pl.js": 259,
	"./pt": 260,
	"./pt-br": 261,
	"./pt-br.js": 261,
	"./pt.js": 260,
	"./ro": 262,
	"./ro.js": 262,
	"./ru": 263,
	"./ru.js": 263,
	"./sd": 264,
	"./sd.js": 264,
	"./se": 265,
	"./se.js": 265,
	"./si": 266,
	"./si.js": 266,
	"./sk": 267,
	"./sk.js": 267,
	"./sl": 268,
	"./sl.js": 268,
	"./sq": 269,
	"./sq.js": 269,
	"./sr": 270,
	"./sr-cyrl": 271,
	"./sr-cyrl.js": 271,
	"./sr.js": 270,
	"./ss": 272,
	"./ss.js": 272,
	"./sv": 273,
	"./sv.js": 273,
	"./sw": 274,
	"./sw.js": 274,
	"./ta": 275,
	"./ta.js": 275,
	"./te": 276,
	"./te.js": 276,
	"./tet": 277,
	"./tet.js": 277,
	"./tg": 278,
	"./tg.js": 278,
	"./th": 279,
	"./th.js": 279,
	"./tl-ph": 280,
	"./tl-ph.js": 280,
	"./tlh": 281,
	"./tlh.js": 281,
	"./tr": 282,
	"./tr.js": 282,
	"./tzl": 283,
	"./tzl.js": 283,
	"./tzm": 284,
	"./tzm-latn": 285,
	"./tzm-latn.js": 285,
	"./tzm.js": 284,
	"./ug-cn": 286,
	"./ug-cn.js": 286,
	"./uk": 287,
	"./uk.js": 287,
	"./ur": 288,
	"./ur.js": 288,
	"./uz": 289,
	"./uz-latn": 290,
	"./uz-latn.js": 290,
	"./uz.js": 289,
	"./vi": 291,
	"./vi.js": 291,
	"./x-pseudo": 292,
	"./x-pseudo.js": 292,
	"./yo": 293,
	"./yo.js": 293,
	"./zh-cn": 294,
	"./zh-cn.js": 294,
	"./zh-hk": 295,
	"./zh-hk.js": 295,
	"./zh-tw": 296,
	"./zh-tw.js": 296
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 405;

/***/ }),

/***/ 406:
/***/ (function(module, exports) {

class BaseError extends Error {
    constructor(status_code, ...params) {
        super(...params);
        this.status_code = status_code;
    }
}

class ValidationError extends BaseError {
    constructor(...params) { super(417, ...params); }
}

module.exports = {
    ValidationError: ValidationError,
    ValueError: class ValueError extends ValidationError { },
    Conflict: class Conflict extends ValidationError { },
    NotFound: class NotFound extends BaseError {
        constructor(...params) { super(404, ...params); }
    },
    Forbidden: class Forbidden extends BaseError {
        constructor(...params) { super(403, ...params); }
    },
}


/***/ }),

/***/ 407:
/***/ (function(module, exports, __webpack_require__) {

const frappe = __webpack_require__(27);

module.exports = {
    async setName(doc) {
        if (frappe.isServer) {
            // if is server, always name again if autoincrement or other
            if (doc.meta.naming === 'autoincrement') {
                doc.name = await this.getNextId(doc.doctype);
                return;
            }

            if (doc.meta.settings) {
                const numberSeries = (await doc.getSettings()).numberSeries;
                if(numberSeries) {
                    doc.name = await this.getSeriesNext(numberSeries);
                }
            }
        }

        if (doc.name) {
            return;
        }

        // name === doctype for Single
        if (doc.meta.isSingle) {
            doc.name = doc.meta.name;
            return;
        }

        // assign a random name by default
        // override doc to set a name
        if (!doc.name) {
            doc.name = frappe.getRandomString();
        }
    },

    async getNextId(doctype) {
        // get the last inserted row
        let lastInserted = await this.getLastInserted(doctype);
        let name = 1;
        if (lastInserted) {
            let lastNumber = parseInt(lastInserted.name);
            if (isNaN(lastNumber)) lastNumber = 0;
            name = lastNumber + 1;
        }
        return (name + '').padStart(9, '0');
    },

    async getLastInserted(doctype) {
        const lastInserted = await frappe.db.getAll({
            doctype: doctype,
            fields: ['name'],
            limit: 1,
            order_by: 'creation',
            order: 'desc'
        });
        return (lastInserted && lastInserted.length) ? lastInserted[0] : null;
    },

    async getSeriesNext(prefix) {
        let series;
        try {
            series = await frappe.getDoc('NumberSeries', prefix);
        } catch (e) {
            if (!e.status_code || e.status_code !== 404) {
                throw e;
            }
            await this.createNumberSeries(prefix);
        }
        let next = await series.next()
        return prefix + next;
    },

    async createNumberSeries(prefix, setting, start=1000) {
        if (!(await frappe.db.exists('NumberSeries', prefix))) {
            const series = frappe.newDoc({doctype: 'NumberSeries', name: prefix, current: start});
            await series.insert();

            if (setting) {
                const settingDoc = await frappe.getSingle(setting);
                settingDoc.numberSeries = series.name;
                await settingDoc.update();
            }
        }
    }
}


/***/ }),

/***/ 408:
/***/ (function(module, exports, __webpack_require__) {

const BaseDocument = __webpack_require__(55);
const frappe = __webpack_require__(27);
const model = __webpack_require__(409)

module.exports = class BaseMeta extends BaseDocument {
    constructor(data) {
        super(data);
        this.setDefaultIndicators();
        if (this.setupMeta) {
            this.setupMeta();
        }
        if (!this.titleField) {
            this.titleField = 'name';
        }
    }

    hasField(fieldname) {
        return this.getField(fieldname) ? true : false;
    }

    getField(fieldname) {
        if (!this._field_map) {
            this._field_map = {};
            for (let field of this.fields) {
                this._field_map[field.fieldname] = field;
            }
        }
        return this._field_map[fieldname];
    }

    getLabel(fieldname) {
        return this.getField(fieldname).label;
    }

    getTableFields() {
        if (this._tableFields===undefined) {
            this._tableFields = this.fields.filter(field => field.fieldtype === 'Table');
        }
        return this._tableFields;
    }

    getFormulaFields() {
        if (this._formulaFields===undefined) {
            this._formulaFields = this.fields.filter(field => field.formula);
        }
        return this._formulaFields;
    }

    hasFormula() {
        if (this._hasFormula===undefined) {
            this._hasFormula = false;
            if (this.getFormulaFields().length) {
                this._hasFormula = true;
            } else {
                for (let tablefield of this.getTableFields()) {
                    if (frappe.getMeta(tablefield.childtype).getFormulaFields().length) {
                        this._hasFormula = true;
                        break;
                    }
                }
            }
        }
        return this._hasFormula;
    }

    async set(fieldname, value) {
        this[fieldname] = value;
        await this.trigger(fieldname);
    }

    get(fieldname) {
        return this[fieldname];
    }

    getValidFields({ withChildren = true } = {}) {
        if (!this._validFields) {

            this._validFields = [];
            this._validFieldsWithChildren = [];

            const _add = (field) => {
                this._validFields.push(field);
                this._validFieldsWithChildren.push(field);
            }

            const doctype_fields = this.fields.map((field) => field.fieldname);

            // standard fields
            for (let field of model.commonFields) {
                if (frappe.db.typeMap[field.fieldtype] && !doctype_fields.includes(field.fieldname)) {
                    _add(field);
                }
            }

            if (this.isSubmittable) {
                _add({fieldtype:'Check', fieldname: 'submitted', label: frappe._('Submitted')})
            }

            if (this.isChild) {
                // child fields
                for (let field of model.childFields) {
                    if (frappe.db.typeMap[field.fieldtype] && !doctype_fields.includes(field.fieldname)) {
                        _add(field);
                    }
                }
            } else {
                // parent fields
                for (let field of model.parentFields) {
                    if (frappe.db.typeMap[field.fieldtype] && !doctype_fields.includes(field.fieldname)) {
                        _add(field);
                    }
                }
            }

            // doctype fields
            for (let field of this.fields) {
                let include = frappe.db.typeMap[field.fieldtype];

                if (include) {
                    _add(field);
                }

                // include tables if (withChildren = True)
                if (!include && field.fieldtype === 'Table') {
                    this._validFieldsWithChildren.push(field);
                }
            }
        }

        if (withChildren) {
            return this._validFieldsWithChildren;
        } else {
            return this._validFields;
        }
    }

    getKeywordFields() {
        if (!this._keywordFields) {
            this._keywordFields = this.keywordFields;
            if (!(this._keywordFields && this._keywordFields.length && this.fields)) {
                this._keywordFields = this.fields.filter(field => field.fieldtype !== 'Table' && field.required).map(field => field.fieldname);
            }
            if (!(this._keywordFields && this._keywordFields.length)) {
                this._keywordFields = ['name']
            }
        }
        return this._keywordFields;
    }

    validateSelect(field, value) {
        let options = field.options;
        if (!options) return;

        if (typeof options === 'string') {
            // values given as string
            options = field.options.split('\n');
        }
        if (!options.includes(value)) {
            throw new frappe.errors.ValueError(`${value} must be one of ${options.join(", ")}`);
        }
        return value;
    }

    async trigger(event, params = {}) {
        Object.assign(params, {
            doc: this,
            name: event
        });

        await super.trigger(event, params);
    }

    setDefaultIndicators() {
        if (!this.indicators) {
            if (this.isSubmittable) {
                this.indicators = {
                    key: 'submitted',
                    colors: {
                        0: 'gray',
                        1: 'blue'
                    }
                }
            }
        }
    }

    getIndicatorColor(doc) {
        if (frappe.isDirty(this.name, doc.name)) {
            return 'orange';
        } else {
            if (this.indicators) {
                let value = doc[this.indicators.key];
                if (value) {
                    return this.indicators.colors[value] || 'gray';
                } else {
                    return 'gray';
                }
            } else {
                return 'gray';
            }
        }
    }
}

/***/ }),

/***/ 409:
/***/ (function(module, exports) {

module.exports = {
    commonFields: [
        {
            fieldname: 'name', fieldtype: 'Data', required: 1
        }
    ],
    parentFields: [
        {
            fieldname: 'owner', fieldtype: 'Data', required: 1
        },
        {
            fieldname: 'modifiedBy', fieldtype: 'Data', required: 1
        },
        {
            fieldname: 'creation', fieldtype: 'Datetime', required: 1
        },
        {
            fieldname: 'modified', fieldtype: 'Datetime', required: 1
        },
        {
            fieldname: 'keywords', fieldtype: 'Text'
        }
    ],
    childFields: [
        {
            fieldname: 'idx', fieldtype: 'Int', required: 1
        },
        {
            fieldname: 'parent', fieldtype: 'Data', required: 1
        },
        {
            fieldname: 'parenttype', fieldtype: 'Data', required: 1
        },
        {
            fieldname: 'parentfield', fieldtype: 'Data', required: 1
        }
    ]
};

/***/ }),

/***/ 410:
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    models: {
        FilterItem: __webpack_require__(411),
        FilterGroup: __webpack_require__(412),
        FilterSelector: __webpack_require__(413),
        NumberSeries: __webpack_require__(415),
        PrintFormat: __webpack_require__(417),
        Role: __webpack_require__(418),
        Session: __webpack_require__(419),
        SingleValue: __webpack_require__(420),
        SystemSettings: __webpack_require__(421),
        ToDo: __webpack_require__(422),
        User: __webpack_require__(423),
        UserRole: __webpack_require__(424)
    }
}


/***/ }),

/***/ 411:
/***/ (function(module, exports) {

module.exports = {
    name: "FilterItem",
    doctype: "DocType",
    isSingle: 0,
    isChild: 1,
    keywordFields: [],
    fields: [
        {
            fieldname: "field",
            label: "Field",
            fieldtype: "Select",
            required: 1
        },
        {
            fieldname: "condition",
            label: "Condition",
            fieldtype: "Select",
            options: [
                'Equals',
                '>',
                '<',
                '>=',
                '<=',
                'Between',
                'Includes',
                'One Of'
            ],
            required: 1
        },
        {
            fieldname: "value",
            label: "Value",
            fieldtype: "Data",
        }
    ]
}

/***/ }),

/***/ 412:
/***/ (function(module, exports) {

module.exports = {
    name: "FilterGroup",
    isSingle: 0,
    isChild: 0,
    keywordFields: [],
    fields: [
        {
            fieldname: "name",
            label: "Name",
            fieldtype: "Data",
            required: 1
        },
        {
            fieldname: "forDocType",
            label: "Document Type",
            fieldtype: "Data",
            required: 1,
            disabled: 1,
        },
        {
            fieldname: "items",
            fieldtype: "Table",
            childtype: "FilterItem",
            label: "Items",
            required: 1
        }
   ]
}

/***/ }),

/***/ 413:
/***/ (function(module, exports, __webpack_require__) {

const frappe = __webpack_require__(27);

module.exports = {
    name: "FilterSelector",
    label: "Set Filters",
    documentClass: __webpack_require__(414),
    isSingle: 1,
    isChild: 0,
    keywordFields: [],
    fields: [
        {
            fieldname: "forDocType",
            label: "Document Type",
            fieldtype: "Data",
            hidden: 1,
        },
        {
            fieldname: "filterGroup",
            label: "Saved Filters",
            fieldtype: "Link",
            target: "FilterGroup",
            getFilters: (query, control) => {
                return {
                    forDocType: control.doc.forDocType,
                    keywords: ["like", query]
                }
            }
        },
        {
            fieldname: "filterGroupName",
            label: "New Filter Name",
            fieldtype: "Data",
        },
        {
            fieldname: "items",
            label: "Items",
            fieldtype: "Table",
            childtype: "FilterItem",
            neverEmpty: 1,

            // copy items from saved filter group
            formula: async (doc) => {
                if (doc._lastFilterGroup !== doc.filterGroup) {
                    // fitler changed

                    if (doc.filterGroup) {
                        doc.items = [];
                        const filterGroup = await frappe.getDoc('FilterGroup', doc.filterGroup);

                        // copy items
                        for(let source of filterGroup.items) {
                            const item = Object.assign({}, source);
                            item.parent = item.name = '';
                            doc.items.push(item);
                        }
                    } else {
                        // no filter group selected
                        doc.items = [{idx: 0}];
                    }

                    doc._lastFilterGroup = doc.filterGroup;
                }
                return false;
            },
        }
    ],

    formEvents: {
        // set the fields of the selected item in the 'select'
        refresh: (form) => {
            // override the `getOptions` method in the `field` property
            frappe.getMeta('FilterItem').getField('field').getOptions = () => {
                return frappe.getMeta(form.doc.forDocType).fields.map((f) => {
                    return {label: f.label, value: f.fieldname};
                });
            }
        }
    }
}

/***/ }),

/***/ 414:
/***/ (function(module, exports, __webpack_require__) {

const BaseDocument = __webpack_require__(55);
const frappe = __webpack_require__(27);

module.exports = class FormSelector extends BaseDocument {
    reset(doctype) {
        if (doctype) {
            this.forDocType = doctype;
        }
        this.items = [];
        this.filterGroup = '';
        this.filterGroupName = '';
    }

    getFilters() {
        const filters = {};
        for (let item of (this.items || [])) {
            filters[item.field] = [(item.condition === 'Equals') ? '=' : item.condition,
                item.value];
        }
        return filters;
    }

    setFilters(filters) {
        this.reset();
        for (let key in filters) {
            let value  = filters[key];
            if (value instanceof Array) {
                this.items.push({field: key, condition: value[0], value: value[1]});
            } else {
                this.items.push({field: key, condition: 'Equals', value: value});
            }
        }
    }

    getText() {
        if (this.items && this.items.length) {
            this.forMeta = frappe.getMeta(this.forDocType);
            return this.items.map(v => `${this.forMeta.getLabel(v.field)} ${v.condition} ${v.value}`).join(', ');
        } else {
            return 'Set Filters';
        }
    }

    async update() {
        // save new group filter
        if (frappe.isServer) {
            if (this.filterGroupName) {
                await this.makeFilterGroup();
            } else if (this.filterGroup) {
                await this.updateFilterGroup();
            }
            return this;
        } else {
            return super.update();
        }
    }

    async makeFilterGroup() {
        const filterGroup = frappe.newDoc({doctype:'FilterGroup'});
        filterGroup.name = this.filterGroupName;
        this.updateFilterGroupValues(filterGroup);
        await filterGroup.insert();
    }

    async updateFilterGroup() {
        const filterGroup = await frappe.getDoc('FilterGroup', this.filterGroup);
        this.updateFilterGroupValues(filterGroup);
        await filterGroup.update();
    }

    updateFilterGroupValues(filterGroup) {
        filterGroup.forDocType = this.forDocType;
        filterGroup.items = [];
        for (let item of this.items) {
            filterGroup.items.push({field: item.field, condition: item.condition, value: item.value});
        }
    }
}

/***/ }),

/***/ 415:
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    "name": "NumberSeries",
    "documentClass": __webpack_require__(416),
    "doctype": "DocType",
    "isSingle": 0,
    "isChild": 0,
    "keywordFields": [],
    "fields": [
        {
            "fieldname": "name",
            "label": "Prefix",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "current",
            "label": "Current",
            "fieldtype": "Int",
            "required": 1
        }
    ]
}

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

const BaseDocument = __webpack_require__(55);

module.exports = class NumberSeries extends BaseDocument {
    validate() {
        if (this.current===null || this.current===undefined) {
            this.current = 0;
        }
    }
    async next() {
        this.validate();
        this.current++;
        await this.update();
        return this.current;
    }
}

/***/ }),

/***/ 417:
/***/ (function(module, exports) {

module.exports = {
    name: "PrintFormat",
    label: "Print Format",
    doctype: "DocType",
    isSingle: 0,
    isChild: 0,
    keywordFields: [],
    fields: [
        {
            fieldname: "name",
            label: "Name",
            fieldtype: "Data",
            required: 1
        },
        {
            fieldname: "for",
            label: "For",
            fieldtype: "Data",
            required: 1
        },
        {
            fieldname: "template",
            label: "Template",
            fieldtype: "Code",
            required: 1,
            options: {
                mode: 'text/html'
            }
        }
    ]
}

/***/ }),

/***/ 418:
/***/ (function(module, exports) {

module.exports = {
    "name": "Role",
    "doctype": "DocType",
    "isSingle": 0,
    "isChild": 0,
    "keywordFields": [],
    "fields": [
        {
            "fieldname": "name",
            "label": "Name",
            "fieldtype": "Data",
            "required": 1
        }
    ]
}

/***/ }),

/***/ 419:
/***/ (function(module, exports) {

module.exports = {
    "name": "Session",
    "doctype": "DocType",
    "isSingle": 0,
    "isChild": 0,
    "keywordFields": [],
    "fields": [
        {
            "fieldname": "username",
            "label": "Username",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "password",
            "label": "Password",
            "fieldtype": "Password",
            "required": 1
        }
    ]
}

/***/ }),

/***/ 420:
/***/ (function(module, exports) {

module.exports = {
    "name": "SingleValue",
    "doctype": "DocType",
    "isSingle": 0,
    "isChild": 0,
    "keywordFields": [],
    "fields": [
        {
            "fieldname": "parent",
            "label": "Parent",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "fieldname",
            "label": "Fieldname",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "value",
            "label": "Value",
            "fieldtype": "Data",
            "required": 1
        }
    ]
}

/***/ }),

/***/ 421:
/***/ (function(module, exports) {

module.exports = {
    name: "SystemSettings",
    label: "System Settings",
    doctype: "DocType",
    isSingle: 1,
    isChild: 0,
    keywordFields: [],
    fields: [
        {
            fieldname: "dateFormat",
            label: "Date Format",
            fieldtype: "Select",
            options: [
                "dd/mm/yyyy",
                "mm/dd/yyyy",
                "dd-mm-yyyy",
                "mm-dd-yyyy",
                "yyyy-mm-dd"
            ],
            default: "yyyy-mm-dd",
            required: 1
        }
    ]
}

/***/ }),

/***/ 422:
/***/ (function(module, exports) {

module.exports = {
    name: "ToDo",
    label: "To Do",
    naming: "autoincrement",
    pageSettings: {
        hideTitle: true
    },
    "isSingle": 0,
    "keywordFields": [
        "subject",
        "description"
    ],
    titleField: 'subject',
    indicators: {
        key: 'status',
        colors: {
            Open: 'gray',
            Closed: 'green'
        }
    },
    "fields": [
        {
            "fieldname": "subject",
            "label": "Subject",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "status",
            "label": "Status",
            "fieldtype": "Select",
            "options": [
                "Open",
                "Closed"
            ],
            "default": "Open",
            "required": 1
        },
        {
            "fieldname": "description",
            "label": "Description",
            "fieldtype": "Text"
        }
    ],

    links: [
        {
            label: 'Close',
            condition: (form) => form.doc.status !== 'Closed',
            action: async (form) => {
                await form.doc.set('status', 'Closed');
                await form.doc.update();
            }
        },
        {
            label: 'Re-Open',
            condition: (form) => form.doc.status !== 'Open',
            action: async (form) => {
                await form.doc.set('status', 'Open');
                await form.doc.update();
            }
        }
    ]
}

/***/ }),

/***/ 423:
/***/ (function(module, exports) {

module.exports = {
    "name": "User",
    "doctype": "DocType",
    "isSingle": 0,
    "isChild": 0,
    "keywordFields": [
        "name",
        "full_name"
    ],
    "fields": [
        {
            "fieldname": "name",
            "label": "Name",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "full_name",
            "label": "Full Name",
            "fieldtype": "Data",
            "required": 1
        },
        {
            "fieldname": "roles",
            "label": "Roles",
            "fieldtype": "Table",
            "childtype": "UserRole"
        }
    ]
}

/***/ }),

/***/ 424:
/***/ (function(module, exports) {

module.exports = {
    "name": "UserRole",
    "doctype": "DocType",
    "isSingle": 0,
    "isChild": 1,
    "keywordFields": [],
    "fields": [
        {
            "fieldname": "role",
            "label": "Role",
            "fieldtype": "Link",
            "target": "Role"
        }
    ]
}

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

const frappe = __webpack_require__(27);
const Observable = __webpack_require__(92);

module.exports = class HTTPClient extends Observable {
    constructor({ server, protocol = 'http' }) {
        super();

        this.server = server;
        this.protocol = protocol;

        // if the backend is http, then always client!
        frappe.isServer = false;

        this.initTypeMap();
    }

    connect() {

    }

    async insert(doctype, doc) {
        doc.doctype = doctype;
        let url = this.getURL('/api/resource', doctype);
        return await this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(doc)
        })
    }

    async get(doctype, name) {
        let url = this.getURL('/api/resource', doctype, name);
        return await this.fetch(url, {
            method: 'GET',
            headers: this.getHeaders()
        })
    }

    async getAll({ doctype, fields, filters, start, limit, sort_by, order }) {
        let url = this.getURL('/api/resource', doctype);

        url = url + "?" + frappe.getQueryString({
            fields: JSON.stringify(fields),
            filters: JSON.stringify(filters),
            start: start,
            limit: limit,
            sort_by: sort_by,
            order: order
        });

        return await this.fetch(url, {
            method: 'GET',
        });
    }

    async update(doctype, doc) {
        doc.doctype = doctype;
        let url = this.getURL('/api/resource', doctype, doc.name);

        return await this.fetch(url, {
            method: 'PUT',
            body: JSON.stringify(doc)
        });
    }

    async delete(doctype, name) {
        let url = this.getURL('/api/resource', doctype, name);

        return await this.fetch(url, {
            method: 'DELETE',
        });
    }

    async deleteMany(doctype, names) {
        let url = this.getURL('/api/resource', doctype);

        return await this.fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(names)
        });
    }

    async exists(doctype, name) {
        return (await this.getValue(doctype, name, 'name')) ? true : false;
    }

    async getValue(doctype, name, fieldname) {
        let url = this.getURL('/api/resource', doctype, name, fieldname);

        return (await this.fetch(url, {
            method: 'GET',
        })).value;
    }

    async fetch(url, args) {
        args.headers = this.getHeaders();
        let response = await frappe.fetch(url, args);
        let data = await response.json();

        if (response.status !== 200) {
            throw Error(data.error);
        }

        return data;
    }

    getURL(...parts) {
        return this.protocol + '://' + this.server + parts.join('/');
    }

    getHeaders() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    initTypeMap() {
        this.typeMap = {
            'Autocomplete': true
            , 'Currency': true
            , 'Int': true
            , 'Float': true
            , 'Percent': true
            , 'Check': true
            , 'Small Text': true
            , 'Long Text': true
            , 'Code': true
            , 'Text Editor': true
            , 'Date': true
            , 'Datetime': true
            , 'Time': true
            , 'Text': true
            , 'Data': true
            , 'Link': true
            , 'DynamicLink': true
            , 'Password': true
            , 'Select': true
            , 'Read Only': true
            , 'File': true
            , 'Attach': true
            , 'Attach Image': true
            , 'Signature': true
            , 'Color': true
            , 'Barcode': true
            , 'Geolocation': true
        }
    }

    close() {

    }

}

/***/ }),

/***/ 444:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_to_do_list_to_do_list__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_display_to_do_display_to_do__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, app, toastCtrl) {
        var _this = this;
        this.app = app;
        this.toastCtrl = toastCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            platform.registerBackButtonAction(function (fn) {
                var overlay = _this.app._appRoot._overlayPortal.getActive();
                var nav = _this.app.getActiveNav();
                if (overlay && overlay.dismiss) {
                    overlay.dismiss();
                }
                else if (nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]
                    || nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_5__pages_to_do_list_to_do_list__["a" /* ToDoListPage */]) {
                    if (Date.now() - _this.lastBack < 500) {
                        platform.exitApp();
                    }
                    else {
                        var toast = _this.toastCtrl.create({
                            message: 'Press back twice to exit',
                            duration: 1000,
                            position: 'bottom'
                        });
                        toast.present();
                    }
                }
                else if (nav.getActive().instance instanceof __WEBPACK_IMPORTED_MODULE_6__pages_display_to_do_display_to_do__["a" /* DisplayToDoPage */]) {
                    nav.pop();
                }
                _this.lastBack = Date.now();
            });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/allen/Projects/ToDo/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/allen/Projects/ToDo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToDoListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__display_to_do_display_to_do__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_popover_popover__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var ToDoListPage = /** @class */ (function () {
    function ToDoListPage(navCtrl, navParams, toastCtrl, popoverCtrl, storage, viewCtrl, network, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.popoverCtrl = popoverCtrl;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.network = network;
        this.loadingCtrl = loadingCtrl;
        // watch network for a connection
        this.network.onConnect().subscribe(function () {
            console.log('network connected!');
        });
        // watch network for a disconnection
        this.network.onDisconnect().subscribe(function () {
            console.log('network disconnected!');
        });
    }
    ToDoListPage.prototype.doRefresh = function (refresher) {
        this.ionViewDidEnter();
        refresher.complete();
    };
    ToDoListPage.prototype.ionViewDidLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.frappe = window.frappe;
                return [2 /*return*/];
            });
        });
    };
    ToDoListPage.prototype.ionViewCanLeave = function () {
        if (this.popover) {
            this.popover.dismiss();
            this.popover = null;
        }
    };
    ToDoListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.popover) {
            this.popover.dismiss();
            this.popover = null;
        }
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        setTimeout(function () {
            if (_this.network.type == 'wifi' || _this.network.type == '4g' || _this.network.type == '3g') {
                _this.loadData();
            }
            else {
                _this.combinify();
            }
            loading.dismiss();
        }, 1000);
    };
    ToDoListPage.prototype.loadData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var exception, error_1, toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        exception = null;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.frappe.db.getAll({ doctype: "ToDo",
                                fields: ["name", "status", "description", "subject"] }).then(function (r) {
                                _this.combinify(r);
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        exception = error_1;
                        toast = this.toastCtrl.create({
                            message: 'Server unreachable',
                            duration: 1000,
                            position: 'bottom'
                        });
                        toast.present();
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ToDoListPage.prototype.combinify = function (serv_data) {
        if (serv_data === void 0) { serv_data = []; }
        return __awaiter(this, void 0, void 0, function () {
            var ld;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ld = [];
                        return [4 /*yield*/, this.storage.get("local_data").then(function (r) {
                                ld = r;
                            })];
                    case 1:
                        _a.sent();
                        if (!(serv_data.length <= 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.storage.get("serv_data").then(function (r) {
                                serv_data = r;
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.storage.set("serv_data", serv_data)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.data = ld.concat(serv_data);
                        return [2 /*return*/];
                }
            });
        });
    };
    ToDoListPage.prototype.displayTodo = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__display_to_do_display_to_do__["a" /* DisplayToDoPage */], {
            item: item,
            disabled: true
        });
    };
    ToDoListPage.prototype.addToDo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__display_to_do_display_to_do__["a" /* DisplayToDoPage */], {
            disabled: false
        });
    };
    ToDoListPage.prototype.presentPopover = function (myEvent) {
        if (!this.popover) {
            this.me = { me: this };
            this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__components_popover_popover__["a" /* PopoverComponent */], this.me, { cssClass: 'custom-popover' });
            this.popover.present({
                ev: myEvent
            });
        }
        else {
            this.popover.dismiss();
            this.popover = null;
        }
    };
    ToDoListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-to-do-list',template:/*ion-inline-start:"/Users/allen/Projects/ToDo/src/pages/to-do-list/to-do-list.html"*/'<ion-header>\n\n  <ion-navbar hideBackButton="true">\n	<ion-title>ToDoList</ion-title>\n	<ion-buttons end>\n		<button ion-button (click)="presentPopover($event)">\n			<ion-icon name="menu"></ion-icon>\n		</button>\n	</ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n	<ion-refresher (ionRefresh)="doRefresh($event)">\n		<ion-refresher-content></ion-refresher-content>\n	</ion-refresher>\n\n	<ion-list class="accordion-list">\n		<ion-list-header *ngFor="let item of data;">\n			<ion-checkbox id="{{item.name}}"></ion-checkbox>\n			<button item-end ion-item (click)="displayTodo(item)" class="list-item">\n				{{ item.subject }}\n			</button>			\n		</ion-list-header>\n	</ion-list>\n\n	<ion-fab bottom right>\n		<button ion-fab (click)="addToDo()">\n			<ion-icon ios="md-add" md="md-add"></ion-icon>\n		</button>\n	</ion-fab>\n\n</ion-content>\n'/*ion-inline-end:"/Users/allen/Projects/ToDo/src/pages/to-do-list/to-do-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], ToDoListPage);
    return ToDoListPage;
}());

//# sourceMappingURL=to-do-list.js.map

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

const frappe = __webpack_require__(27);
const Observable = __webpack_require__(92);
const naming = __webpack_require__(407);

module.exports = class BaseDocument extends Observable {
    constructor(data) {
        super();
        this.fetchValuesCache = {};
        this.flags = {};
        this.setup();
        Object.assign(this, data);

        // clear fetch-values cache
        frappe.db.on('change', (params) => this.fetchValuesCache[`${params.doctype}:${params.name}`] = {});
    }

    setup() {
        // add listeners
    }

    get meta() {
        if (!this._meta) {
            this._meta = frappe.getMeta(this.doctype);
        }
        return this._meta;
    }

    async getSettings() {
        if (!this._settings) {
            this._settings = await frappe.getSingle(this.meta.settings);
        }
        return this._settings;
    }

    // set value and trigger change
    async set(fieldname, value) {
        if (this[fieldname] !== value) {
            this._dirty = true;
            this[fieldname] = await this.validateField(fieldname, value);
            await this.applyChange(fieldname);
        }
    }

    async applyChange(fieldname) {
        if (await this.applyFormula()) {
            // multiple changes
            await this.trigger('change', { doc: this });
        } else {
            // no other change, trigger control refresh
            await this.trigger('change', { doc: this, fieldname: fieldname });
        }
    }

    setDefaults() {
        for (let field of this.meta.fields) {
            if (this[field.fieldname]===null || this[field.fieldname]===undefined) {
                if (field.fieldtype === 'Date') {
                    this[field.fieldname] = (new Date()).toISOString().substr(0, 10);
                } else if(field.default) {
                    this[field.fieldname] = field.default;
                }
            }
        }
    }

    setKeywords() {
        let keywords = [];
        for (let fieldname of this.meta.getKeywordFields()) {
            keywords.push(this[fieldname]);
        }
        this.keywords = keywords.join(', ');
    }

    append(key, document) {
        if (!this[key]) {
            this[key] = [];
        }
        this[key].push(this.initDoc(document));
    }

    initDoc(data) {
        if (data.prototype instanceof Document) {
            return data;
        } else {
            return new Document(data);
        }
    }

    async validateField(key, value) {
        let field = this.meta.getField(key);
        if (field && field.fieldtype == 'Select') {
            return this.meta.validateSelect(field, value);
        }
        return value;
    }

    getValidDict() {
        let data = {};
        for (let field of this.meta.getValidFields()) {
            data[field.fieldname] = this[field.fieldname];
        }
        return data;
    }

    getFullDict() {
        let data = this.getValidDict();
        return data;
    }

    setStandardValues() {
        // set standard values on server-side only
        if (frappe.isServer) {
            let now = (new Date()).toISOString();
            if (!this.submitted) this.submitted = 0;
            if (!this.owner) {
                this.owner = frappe.session.user;
                this.creation = now;
            }
            this.modifiedBy = frappe.session.user;
            this.modified = now;
        }
    }

    async load() {
        let data = await frappe.db.get(this.doctype, this.name);
        if (data.name) {
            this.syncValues(data);
            if (this.meta.isSingle) {
                this.setDefaults();
            }
        } else {
            throw new frappe.errors.NotFound(`Not Found: ${this.doctype} ${this.name}`);
        }
    }

    syncValues(data) {
        this.clearValues();
        Object.assign(this, data);
        this._dirty = false;
        this.trigger('change', {doc: this});
    }

    clearValues() {
        for (let field of this.meta.getValidFields()) {
            if(this[field.fieldname]) {
                delete this[field.fieldname];
            }
        }
    }

    setChildIdx() {
        // renumber children
        for (let field of this.meta.getValidFields()) {
            if (field.fieldtype==='Table') {
                for(let i=0; i < (this[field.fieldname] || []).length; i++) {
                    this[field.fieldname][i].idx = i;
                }
            }
        }
    }

    async compareWithCurrentDoc() {
        if (frappe.isServer && !this._notInserted) {
            let currentDoc = await frappe.db.get(this.doctype, this.name);

            // check for conflict
            if (currentDoc && this.modified != currentDoc.modified) {
                throw new frappe.errors.Conflict(frappe._('Document {0} {1} has been modified after loading', [this.doctype, this.name]));
            }

            if (this.submitted && !this.meta.isSubmittable) {
                throw new frappe.errors.ValidationError(frappe._('Document type {1} is not submittable', [this.doctype]));
            }

            // set submit action flag
            if (this.submitted && !currentDoc.submitted) {
                this.flags.submitAction = true;
            }

            if (currentDoc.submitted && !this.submitted) {
                this.flags.revertAction = true;
            }

        }
    }

    async applyFormula() {
        if (!this.meta.hasFormula()) {
            return false;
        }

        let doc = this;

        // children
        for (let tablefield of this.meta.getTableFields()) {
            let formulaFields = frappe.getMeta(tablefield.childtype).getFormulaFields();
            if (formulaFields.length) {

                // for each row
                for (let row of this[tablefield.fieldname]) {
                    for (let field of formulaFields) {
                        const val = await field.formula(row, doc);
                        if (val !== false) {
                            row[field.fieldname] = val;
                        }
                    }
                }
            }
        }

        // parent
        for (let field of this.meta.getFormulaFields()) {
            const val = await field.formula(doc);
            if (val !== false) {
                doc[field.fieldname] = val;
            }
        }

        return true;
    }

    async commit() {
        // re-run triggers
        this.setStandardValues();
        this.setKeywords();
        this.setChildIdx();
        await this.applyFormula();
        await this.trigger('validate');
    }

    async insert() {
        await naming.setName(this);
        await this.commit();
        await this.trigger('beforeInsert');

        const data = await frappe.db.insert(this.doctype, this.getValidDict());
        this.syncValues(data);

        await this.trigger('afterInsert');
        await this.trigger('afterSave');

        return this;
    }

    async update() {
        await this.compareWithCurrentDoc();
        await this.commit();
        await this.trigger('beforeUpdate');

        // before submit
        if (this.flags.submitAction) await this.trigger('beforeSubmit');
        if (this.flags.revertAction) await this.trigger('beforeRevert');

        const data = await frappe.db.update(this.doctype, this.getValidDict());
        this.syncValues(data);

        await this.trigger('afterUpdate');
        await this.trigger('afterSave');

        // after submit
        if (this.flags.submitAction) await this.trigger('afterSubmit');
        if (this.flags.revertAction) await this.trigger('afterRevert');

        return this;
    }

    async delete() {
        await this.trigger('before_delete');
        await frappe.db.delete(this.doctype, this.name);
        await this.trigger('after_delete');
    }

    async submit() {
        this.submitted = 1;
        this.update();
    }

    async revert() {
        this.submitted = 0;
        this.update();
    }

    // trigger methods on the class if they match
    // with the trigger name
    async trigger(event, params) {
        if (this[event]) {
            await this[event](params);
        }
        await super.trigger(event, params);
    }

    // helper functions
    getSum(tablefield, childfield) {
        return this[tablefield].map(d => (d[childfield] || 0)).reduce((a, b) => a + b, 0);
    }

    async getFrom(doctype, name, fieldname) {
        if (!name) return '';
        let _values = this.fetchValuesCache[`${doctype}:${name}`] || (this.fetchValuesCache[`${doctype}:${name}`] = {});
        if (!_values[fieldname]) {
            _values[fieldname] = await frappe.db.getValue(doctype, name, fieldname);
        }
        return _values[fieldname];
    }
};

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisplayToDoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__to_do_list_to_do_list__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_popover_popover__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var DisplayToDoPage = /** @class */ (function () {
    function DisplayToDoPage(navCtrl, navParams, popoverCtrl, network, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popoverCtrl = popoverCtrl;
        this.network = network;
        this.storage = storage;
        // watch network for a connection
        this.network.onConnect().subscribe(function () {
            console.log('network connected!');
        });
        // watch network for a disconnection
        this.network.onDisconnect().subscribe(function () {
            console.log('network disconnected!');
        });
    }
    DisplayToDoPage.prototype.ionViewDidLoad = function () {
        this.statusList = ["Open", "Closed"];
        this.frappe = window.frappe;
        this.disabled = this.navParams.get('disabled');
        this.update = this.navParams.get('update');
        this.item = this.navParams.get('item');
        if (this.item) {
            this.title = this.item.name;
            this.subject = this.item.subject;
            this.description = this.item.description;
            this.status = this.item.status;
        }
        else {
            this.title = "New Todo";
        }
    };
    DisplayToDoPage.prototype.ionViewCanLeave = function () {
        if (this.popover) {
            this.popover.dismiss();
            this.popover = null;
        }
        if (this.update) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__to_do_list_to_do_list__["a" /* ToDoListPage */]);
        }
    };
    DisplayToDoPage.prototype.saveToDo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var temp_data, temp_1, temp_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        temp_data = { "subject": this.subject, "description": this.description, "status": this.status };
                        if (!(this.network.type == 'wifi' || this.network.type == '4g' || this.network.type == '3g')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.frappe.db.insert("ToDo", temp_data)
                                .then(function (r) {
                                _this.item = r;
                                _this.title = _this.item.name;
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get("serv_data").then(function (r) {
                                temp_1 = r.concat(_this.item);
                            })];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.storage.set("serv_data", temp_1)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 4: return [4 /*yield*/, this.storage.get("local_data").then(function (r) {
                            temp_2 = r.concat(temp_data);
                        })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.storage.set("local_data", temp_2).then(function (r) {
                            })];
                    case 6:
                        _a.sent();
                        this.title = "";
                        _a.label = 7;
                    case 7:
                        this.disabled = true;
                        this.update = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    DisplayToDoPage.prototype.updateToDo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var temp_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.item.subject = this.subject;
                        this.item.status = this.status;
                        this.item.description = this.description;
                        if (!(this.network.type == 'wifi' || this.network.type == '4g' || this.network.type == '3g')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.frappe.db.update("ToDo", this.item)
                                .then(function (r) {
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, this.storage.get("local_data").then(function (r) {
                            temp_3 = r.concat([_this.item]);
                        })];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.storage.set("local_data", temp_3)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        this.disabled = true;
                        this.update = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    DisplayToDoPage.prototype.presentPopover = function (myEvent) {
        if (!this.popover) {
            this.me = { me: this };
            this.popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_3__components_popover_popover__["a" /* PopoverComponent */], this.me, { cssClass: 'custom-popover' });
            this.popover.present({
                ev: myEvent
            });
        }
        else {
            this.popover.dismiss();
            this.popover = null;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], DisplayToDoPage.prototype, "subject", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], DisplayToDoPage.prototype, "description", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], DisplayToDoPage.prototype, "status", void 0);
    DisplayToDoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-display-to-do',template:/*ion-inline-start:"/Users/allen/Projects/ToDo/src/pages/display-to-do/display-to-do.html"*/'<ion-header>\n\n	<ion-navbar>\n		<ion-title> {{ title }} </ion-title>\n		<ion-buttons end *ngIf="title!=\'New Todo\' || update==true">\n			<button ion-button (click)="presentPopover($event)">\n				<ion-icon name="menu"></ion-icon>\n			</button>\n		</ion-buttons>\n	</ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<ion-item>\n		<ion-label color="primary" stacked>Subject</ion-label>\n		<ion-input id="subject" disabled="{{disabled}}" [(ngModel)]="subject"> </ion-input>\n	</ion-item>\n\n	<ion-item>\n		<ion-label color="primary" stacked>Status</ion-label>\n		<ion-select id="status" disabled="{{disabled}}" [(ngModel)]="status">\n			<ion-option *ngFor="let d of statusList" value="{{d}}">\n				{{d}}\n			</ion-option>\n		</ion-select>\n	</ion-item>\n\n	<ion-item>\n		<ion-label color="primary" stacked>Description</ion-label>\n		<ion-textarea id="description" disabled="{{disabled}}" [(ngModel)]="description"> </ion-textarea>\n	</ion-item>\n\n	<div padding>\n			<button *ngIf="update==true" block ion-button (click)="updateToDo()"> Update </button>\n		<button *ngIf="disabled==false && update!=true" block ion-button (click)="saveToDo()"> Save </button>\n	</div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/allen/Projects/ToDo/src/pages/display-to-do/display-to-do.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* PopoverController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]) === "function" && _e || Object])
    ], DisplayToDoPage);
    return DisplayToDoPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=display-to-do.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var PopoverComponent = /** @class */ (function () {
    function PopoverComponent(navParams, navCtrl, storage, viewCtrl, toastCtrl, loadingCtrl, network) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.network = network;
        this.items = [];
        this.store = storage;
        this.frappe = window.frappe;
        this.me = this.navParams.get("me");
        this.prepareDropdown(this.me.navCtrl.getActive().component);
    }
    PopoverComponent.prototype.prepareDropdown = function (currentPage) {
        this.currentPage = currentPage;
        if (this.currentPage.name == "DisplayToDoPage") {
            this.items.push({ name: "edit", label: "Edit" });
            this.items.push({ name: "delete", label: "Delete" });
        }
        if (this.currentPage.name == "ToDoListPage") {
            this.items.push({ name: "deleteMany", label: "Delete" });
        }
        this.items.push({ label: "Settings", name: "settings" });
        this.items.push({ label: "Sync Now", name: "sync_now" });
    };
    PopoverComponent.prototype.itemClick = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, names_1, checkedBoxes, loading, ld_1, temp_data, item_1, sd, i, toast;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = item.name;
                        switch (_a) {
                            case "settings": return [3 /*break*/, 1];
                            case "delete": return [3 /*break*/, 2];
                            case "deleteMany": return [3 /*break*/, 4];
                            case "edit": return [3 /*break*/, 6];
                            case "sync_now": return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 15];
                    case 1:
                        this.viewCtrl.dismiss();
                        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */], {
                            title: "Settings"
                        });
                        return [3 /*break*/, 15];
                    case 2: return [4 /*yield*/, this.frappe.db.delete("ToDo", this.me.item.name)
                            .then(function (r) {
                            _this.me.navCtrl.pop();
                        })];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 15];
                    case 4:
                        names_1 = [];
                        checkedBoxes = Array.from(document.querySelectorAll('.checkbox-checked'));
                        checkedBoxes.forEach(function (element) { names_1.push(element.parentElement.id); });
                        return [4 /*yield*/, this.frappe.db.deleteMany("ToDo", names_1)
                                .then(function (r) {
                                _this.me.loadData();
                                _this.viewCtrl.dismiss();
                            })];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 15];
                    case 6:
                        this.me.update = true;
                        this.me.disabled = false;
                        this.viewCtrl.dismiss();
                        return [3 /*break*/, 15];
                    case 7:
                        if (!(this.network.type == 'wifi' || this.network.type == '4g' || this.network.type == '3g')) return [3 /*break*/, 13];
                        this.viewCtrl.dismiss();
                        loading = this.loadingCtrl.create({
                            content: 'Syncing...'
                        });
                        loading.present();
                        ld_1 = [], temp_data = void 0, sd = [];
                        return [4 /*yield*/, this.storage.get("local_data").then(function (r) {
                                ld_1 = r;
                            })];
                    case 8:
                        _b.sent();
                        i = 0;
                        _b.label = 9;
                    case 9:
                        if (!(i < ld_1.length)) return [3 /*break*/, 12];
                        item_1 = ld_1[i];
                        if (item_1) {
                            temp_data = { "subject": item_1.subject, "description": item_1.description,
                                "status": item_1.status };
                        }
                        return [4 /*yield*/, this.frappe.db.insert("ToDo", temp_data)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11:
                        i++;
                        return [3 /*break*/, 9];
                    case 12:
                        this.storage.set("local_data", []);
                        loading.dismiss();
                        return [3 /*break*/, 14];
                    case 13:
                        toast = this.toastCtrl.create({
                            message: 'Not connected to any network!',
                            duration: 1000,
                            position: 'bottom'
                        });
                        toast.present();
                        _b.label = 14;
                    case 14:
                        this.me.ionViewDidEnter();
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        });
    };
    PopoverComponent.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PopoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'popover',template:/*ion-inline-start:"/Users/allen/Projects/ToDo/src/components/popover/popover.html"*/'<div class="popover-container">\n<ion-list>\n	<ion-item *ngFor="let item of items" (click)="itemClick(item)">\n		{{ item.label }}\n	</ion-item>\n</ion-list>\n</div>\n'/*ion-inline-end:"/Users/allen/Projects/ToDo/src/components/popover/popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network__["a" /* Network */]])
    ], PopoverComponent);
    return PopoverComponent;
}());

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 91:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__frappe__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__to_do_list_to_do_list__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, loadingCtrl, storage, network, toastCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.network = network;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.setupLocalData();
    }
    HomePage.prototype.ionViewDidEnter = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // watch network for a connection
                        this.network.onConnect().subscribe(function () {
                            console.log('network connected!');
                        });
                        // watch network for a disconnection
                        this.network.onDisconnect().subscribe(function () {
                            console.log('network disconnected!');
                        });
                        temp = this.navParams.get("title");
                        if (temp) {
                            this.title = temp;
                            this.save_connect = "Save";
                        }
                        else {
                            this.title = "ToDo";
                            this.save_connect = "Connect";
                        }
                        this.frappe = window.frappe;
                        return [4 /*yield*/, this.storage.get("user").then(function (val) {
                                if (val) {
                                    _this.user = val;
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get("server").then(function (val) {
                                if (val) {
                                    _this.server = val;
                                }
                            })];
                    case 2:
                        _a.sent();
                        if (this.user && this.server && this.title != "Settings") {
                            this.connect();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var me, toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        me = this;
                        if (!this.user) return [3 /*break*/, 2];
                        this.storage.set('server', this.server);
                        this.storage.set('user', this.user);
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_2__frappe__["a" /* default */])(this.server).then(function (r) {
                                _this.frappe = r;
                                me.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__to_do_list_to_do_list__["a" /* ToDoListPage */]);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        toast = this.toastCtrl.create({
                            message: 'User is mandatory',
                            duration: 2000,
                            position: 'bottom'
                        });
                        toast.present();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.setupLocalData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get("local_data").then(function (r) {
                            if (!r) {
                                _this.storage.set("local_data", []);
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.storage.get("serv_data").then(function (r) {
                                if (!r) {
                                    _this.storage.set("serv_data", []);
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], HomePage.prototype, "user", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], HomePage.prototype, "server", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/allen/Projects/ToDo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      {{ title }}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n	<div text-center>\n		<ion-img width="200" height="200" src="../assets/icon/frappe.png"></ion-img>\n	</div>\n\n	<ion-item>\n		<ion-label floating>User</ion-label>\n		<ion-input type="text" id="user" [(ngModel)]="user"></ion-input>\n	</ion-item>\n\n	<ion-item>\n		<ion-label floating>Server</ion-label>\n		<ion-input type="text" id="server" [(ngModel)]="server"></ion-input>\n	</ion-item>\n\n	<div padding>\n		<button block ion-button (click)="connect()"> {{ save_connect }} </button>\n	</div>\n</ion-content>\n'/*ion-inline-end:"/Users/allen/Projects/ToDo/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 92:
/***/ (function(module, exports) {

module.exports = class Observable {
    constructor() {
        this._observable = {
            isHot: {},
            eventQueue: {},
            listeners: {},
            onceListeners: {}
        }
    }

    // getter, setter stubs, so Observable can be used as a simple Document
    get(key) {
        return this[key];
    }

    set(key, value) {
        this[key] = value;
        this.trigger('change', {doc: this, fieldname: key});
    }

    on(event, listener) {
        this._addListener('listeners', event, listener);
        if (this._observable.socketClient) {
            this._observable.socketClient.on(event, listener);
        }
    }

    // remove listener
    off(event, listener) {
        for (let type of ['listeners', 'onceListeners']) {
            let index = this._observable[type][event] && this._observable[type][event].indexOf(listener);
            if (index) {
                this._observable[type][event].splice(index, 1);
            }
        }
    }

    once(event, listener) {
        this._addListener('onceListeners', event, listener);
    }

    async trigger(event, params, throttle=false) {
        if (throttle) {
            if (this._throttled(event, params, throttle)) return;
            params = [params]
        }

        await this._executeTriggers(event, params);
    }

    async _executeTriggers(event, params) {
        let response = await this._triggerEvent('listeners', event, params);
        if (response === false) return false;

        response = await this._triggerEvent('onceListeners', event, params);
        if (response === false) return false;

        // emit via socket
        if (this._observable.socketServer) {
            this._observable.socketServer.emit(event, params);
        }

        // clear once-listeners
        if (this._observable.onceListeners && this._observable.onceListeners[event]) {
            delete this._observable.onceListeners[event];
        }

    }

    clearListeners() {
        this._observable.listeners = {};
        this._observable.onceListeners = {};
    }

    bindSocketClient(socket) {
        // also send events with sockets
        this._observable.socketClient = socket;
    }

    bindSocketServer(socket) {
        // also send events with sockets
        this._observable.socketServer = socket;
    }

    _throttled(event, params, throttle) {
        if (this._observable.isHot[event]) {
            // hot, add to queue
            if (!this._observable.eventQueue[event]) this._observable.eventQueue[event] = [];
            this._observable.eventQueue[event].push(params);

            // aleady hot, quit
            return true;
        }
        this._observable.isHot[event] = true;

        // cool-off
        setTimeout(() => {
            this._observable.isHot[event] = false;

            // flush queue
            if (this._observable.eventQueue[event]) {
                let _queuedParams = this._observable.eventQueue[event];
                this._observable.eventQueue[event] = null;
                this._executeTriggers(event, _queuedParams);
            }
        }, throttle);

        return false;
    }

    _addListener(type, event, listener) {
        if (!this._observable[type][event]) {
            this._observable[type][event] = [];
        }
        this._observable[type][event].push(listener);
    }

    async _triggerEvent(type, event, params) {
        if (this._observable[type][event]) {
            for (let listener of this._observable[type][event]) {
                await listener(params);
            }
        }
    }
}


/***/ })

},[350]);
//# sourceMappingURL=main.js.map