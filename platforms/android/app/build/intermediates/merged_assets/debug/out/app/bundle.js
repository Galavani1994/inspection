module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 	    delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = global["webpackHotUpdate"];
/******/ 	global["webpackHotUpdate"] =     function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 	        hotAddUpdateChunk(chunkId, moreModules);
/******/ 	        if (parentHotUpdateCallback) {
/******/ 	            parentHotUpdateCallback(chunkId, moreModules);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadUpdateChunk(chunkId) {
/******/ 	        const requestPath = './' + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 	        try {
/******/ 	            require(requestPath);
/******/ 	        } catch (e) {
/******/ 	            console.log("Hot download for update chunk failed.");
/******/ 	            console.error(e);
/******/ 	        }
/******/ 	    }
/******/
/******/ 	    function hotDownloadManifest() {
/******/ 	        return new Promise(function (resolve, reject) {
/******/ 	            const requestPath = './' + "" + hotCurrentHash + ".hot-update.json";
/******/ 	            try {
/******/ 	                const update = require(requestPath);
/******/ 	                resolve(update);
/******/ 	            } catch (e) {
/******/ 	                console.log("Hot download for manifest failed.");
/******/ 	                console.error(e);
/******/ 	                reject(e);
/******/ 	            }
/******/ 	        });
/******/ 	    }
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ee25ba6e288f8336f993";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = global["webpackJsonp"] = global["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./main.ts","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/router/index.js");
/* harmony import */ var nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./home/home.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./home_page/inspection-operation/tabs/tabs.component.ts");
/* harmony import */ var _home_page_inspection_operation_inspection_operation_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./home_page/inspection-operation/inspection-operation.component.ts");





var routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] },
    { path: 'inspectionOperation', component: _home_page_inspection_operation_inspection_operation_component__WEBPACK_IMPORTED_MODULE_4__["InspectionOperationComponent"] },
    { path: 'tabs', component: _home_page_inspection_operation_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_3__["TabsComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__["NativeScriptRouterModule"].forRoot(routes)],
            exports: [nativescript_angular_router__WEBPACK_IMPORTED_MODULE_1__["NativeScriptRouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: "<page-router-outlet></page-router-outlet>"
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./app.css":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.i(__webpack_require__("../node_modules/css-loader/index.js?!../node_modules/nativescript-theme-core/css/core.light.css"), "");

// module
exports.push([module.i, " \r\n.fa{\r\n    font-family: \"FontAwesome\", \"fontawesome-webfont\";\r\n}\r\n.far {\r\n    font-family: \"Font Awesome 5 Free\", \"fa-regular-400\";\r\n}\r\n\r\n.fab {\r\n    font-family: \"Font Awesome 5 Brands\", \"fa-brands-400\";\r\n}\r\n\r\n.fas {\r\n    font-family: \"Font Awesome 5 Free\", \"fa-solid-900\";\r\n\r\n}\r\n.fas-icon {\r\n    font-family: \"Font Awesome 5 Free\", \"fa-solid-900\";\r\n    font-size: 40;\r\n}\r\n\r\n.ico {\r\n    font-family: \"IcoMoon-Free\";\r\n}\r\n\r\n", ""]);

// exports
;
    if (true) {
        module.hot.accept();
        module.hot.dispose(() => {
            global.hmrRefresh({ type: 'style', path: './app.css' });
        })
    }

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("../node_modules/nativescript-angular/nativescript.module.js");
/* harmony import */ var nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./app.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./home/home.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./home_page/inspection-operation/tabs/tabs.component.ts");
/* harmony import */ var _home_page_inspection_operation_inspection_operation_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./home_page/inspection-operation/inspection-operation.component.ts");
/* harmony import */ var _home_page_setting_setting_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./home_page/setting/setting.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_information_information_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("./home_page/inspection-operation/tabs/information/information.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_items_items_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("./home_page/inspection-operation/tabs/items/items.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_instance_instance_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("./home_page/inspection-operation/tabs/instance/instance.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_check_list_check_list_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("./home_page/inspection-operation/tabs/check-list/check-list.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_standards_standards_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("./home_page/inspection-operation/tabs/standards/standards.component.ts");
/* harmony import */ var _home_page_inspection_operation_tabs_equipments_equipments_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("./home_page/inspection-operation/tabs/equipments/equipments.component.ts");
/* harmony import */ var nativescript_drop_down_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("../node_modules/nativescript-drop-down/angular/index.js");
/* harmony import */ var nativescript_drop_down_angular__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(nativescript_drop_down_angular__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__("../node_modules/nativescript-angular/index.js");
/* harmony import */ var nativescript_angular__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular__WEBPACK_IMPORTED_MODULE_16__);

















// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"],
                _home_page_inspection_operation_tabs_tabs_component__WEBPACK_IMPORTED_MODULE_5__["TabsComponent"],
                _home_page_inspection_operation_inspection_operation_component__WEBPACK_IMPORTED_MODULE_6__["InspectionOperationComponent"],
                _home_page_setting_setting_component__WEBPACK_IMPORTED_MODULE_7__["SettingComponent"],
                _home_page_inspection_operation_tabs_information_information_component__WEBPACK_IMPORTED_MODULE_8__["InformationComponent"],
                _home_page_inspection_operation_tabs_items_items_component__WEBPACK_IMPORTED_MODULE_9__["ItemsComponent"],
                _home_page_inspection_operation_tabs_instance_instance_component__WEBPACK_IMPORTED_MODULE_10__["InstanceComponent"],
                _home_page_inspection_operation_tabs_check_list_check_list_component__WEBPACK_IMPORTED_MODULE_11__["CheckListComponent"],
                _home_page_inspection_operation_tabs_standards_standards_component__WEBPACK_IMPORTED_MODULE_12__["StandardsComponent"],
                _home_page_inspection_operation_tabs_equipments_equipments_component__WEBPACK_IMPORTED_MODULE_13__["EquipmentsComponent"],
            ],
            imports: [
                nativescript_angular_nativescript_module__WEBPACK_IMPORTED_MODULE_1__["NativeScriptModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_2__["AppRoutingModule"],
                nativescript_drop_down_angular__WEBPACK_IMPORTED_MODULE_14__["DropDownModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_15__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ReactiveFormsModule"],
                nativescript_angular__WEBPACK_IMPORTED_MODULE_16__["NativeScriptFormsModule"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["NO_ERRORS_SCHEMA"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./home/home.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\r\n<ActionBar title=\"عملیات بازرسی\"></ActionBar>\r\n<GridLayout backgroundColor=\"#CCCCCC\">\r\n  <ScrollView>\r\n    <StackLayout margin=\"10\" verticalAlignment=\"center\">\r\n      <StackLayout class=\"form\" padding=\"15\" backgroundColor=\"#FFFFFF\">\r\n        <StackLayout class=\"input-field\">\r\n          <Label text=\"Email\" class=\"label font-weight-bold m-b-5\"></Label>\r\n          <TextField class=\"input\" ></TextField>\r\n          <StackLayout class=\"hr-light\"></StackLayout>\r\n        </StackLayout>\r\n        <StackLayout class=\"input-field\">\r\n          <Label text=\"Password\" class=\"label font-weight-bold m-b-5\"></Label>\r\n          <TextField secure=\"true\" class=\"input\"></TextField>\r\n          <Label class=\"fas fa-apple\" text=\"\"></Label>\r\n          <StackLayout class=\"hr-light\"></StackLayout>\r\n        </StackLayout>\r\n        <Button [nsRouterLink]=\"['/inspectionOperation']\" class=\"btn btn-primary w-full\" text=\"Login\" ></Button>\r\n        <Label [nsRouterLink]=\"['/register']\" text=\"Not a member? Register here.\" class=\"text-center footnote\"></Label>\r\n      </StackLayout>\r\n    </StackLayout>\r\n  </ScrollView>\r\n</GridLayout>\r\n"

/***/ }),

/***/ "./home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__("./home/home.component.html"),
            styles: [__webpack_require__("./home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/inspection-operation.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\nActionBar Label{\n    text-align:right;\n    horizontal-align:right;\n}\n\nGridLayout Label{\n    margin: 10px;\n    width: 45%;\n    height: 45%;\n    background-color: darkslategray;\n    text-align: center;\n    vertical-align: middle;\n    padding-top: 100%;\n}"

/***/ }),

/***/ "./home_page/inspection-operation/inspection-operation.component.html":
/***/ (function(module, exports) {

module.exports = "<Page xmlns=\"http://schemas.nativescript.org/tns.xsd\">\r\n    <Page.ActionBar>\r\n        <ActionBar >\r\n            <Label class=\"h3 p-15\" text=\"صفحه اصلی\" textWrap=\"true\"></Label>\r\n        </ActionBar>\r\n    </Page.ActionBar>\r\n</Page>\r\n<GridLayout columns=\"*, *\" rows=\"*, *\"  backgroundColor=\"lightgray\">\r\n    <Label text=\"ارسال اطلاعات\" row=\"0\" col=\"0\"></Label>\r\n    <Label text=\"دریافت اطلاعات\" row=\"0\" col=\"1\"></Label>\r\n    <Label text=\"تنظیمات\" row=\"1\" col=\"0\"></Label>\r\n    <Label [nsRouterLink]=\"['/tabs']\" text=\"عملیات بازرسی\" row=\"1\" col=\"1\"></Label>\r\n</GridLayout>\r\n"

/***/ }),

/***/ "./home_page/inspection-operation/inspection-operation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InspectionOperationComponent", function() { return InspectionOperationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var InspectionOperationComponent = /** @class */ (function () {
    function InspectionOperationComponent() {
    }
    InspectionOperationComponent.prototype.ngOnInit = function () {
    };
    InspectionOperationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-inspection-operation',
            template: __webpack_require__("./home_page/inspection-operation/inspection-operation.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/inspection-operation.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], InspectionOperationComponent);
    return InspectionOperationComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/tabs/check-list/check-list.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\n"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/check-list/check-list.component.html":
/***/ (function(module, exports) {

module.exports = "<Button text=\"check-list works!\" class=\"btn btn-primary\"></Button>"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/check-list/check-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckListComponent", function() { return CheckListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var CheckListComponent = /** @class */ (function () {
    function CheckListComponent() {
    }
    CheckListComponent.prototype.ngOnInit = function () {
    };
    CheckListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-check-list',
            template: __webpack_require__("./home_page/inspection-operation/tabs/check-list/check-list.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/check-list/check-list.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], CheckListComponent);
    return CheckListComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/tabs/equipments/equipments.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\n"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/equipments/equipments.component.html":
/***/ (function(module, exports) {

module.exports = "<Button text=\"equipments works!\" class=\"btn btn-primary\"></Button>"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/equipments/equipments.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EquipmentsComponent", function() { return EquipmentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var EquipmentsComponent = /** @class */ (function () {
    function EquipmentsComponent() {
    }
    EquipmentsComponent.prototype.ngOnInit = function () {
    };
    EquipmentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-equipments',
            template: __webpack_require__("./home_page/inspection-operation/tabs/equipments/equipments.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/equipments/equipments.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], EquipmentsComponent);
    return EquipmentsComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/tabs/information/information.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\ndock-layout{\n    margin: 10;\n}\ndock-layout label{\n    padding: 10;\n}"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/information/information.component.html":
/***/ (function(module, exports) {

module.exports = "<ScrollView>\r\n    <stack-layout padding=\"30px\" backgroundColor=\"#8fbc8f\">\r\n        <dock-layout >\r\n            <Label dock=\"right\" text=\"شماره ی Notification :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label textAlignment=\"right\" dock=\"left\" [text]=\"notificationNum\" ></Label>\r\n        </dock-layout>\r\n        <dock-layout>\r\n            <Label dock=\"right\" text=\"تاریخ Notification :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label textAlignment=\"right\" dock=\"left\" [text]=\"notificationDate\"></Label>\r\n        </dock-layout>\r\n        <dock-layout>\r\n            <Label dock=\"right\" text=\"شماره ی ITP :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label textAlignment=\"right\" dock=\"left\" [text]=\"itpNum\"></Label>\r\n        </dock-layout>\r\n        <dock-layout>\r\n            <Label dock=\"right\" text=\"تاریخ ITP :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label textAlignment=\"right\" dock=\"left\" [text]=\"itpDate\"></Label>\r\n        </dock-layout>\r\n        <dock-layout>\r\n            <Label dock=\"right\" text=\"شماره ی برنامه :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label textAlignment=\"right\" dock=\"left\" [text]=\"programNum\"></Label>\r\n        </dock-layout>\r\n        <dock-layout>\r\n            <Label dock=\"right\" text=\"تاریخ برنامه :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label textAlignment=\"right\" dock=\"left\"[text]=\"programDate\"></Label>\r\n        </dock-layout>\r\n        <dock-layout>\r\n            <Label dock=\"right\" text=\"ساعت :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label dock=\"right\" [text]=\"fromHour\"></Label>\r\n            <Label dock=\"right\" text=\"تا \" ></Label>\r\n            <Label dock=\"right\" textAlignment=\"right\" [text]=\"toHour\" ></Label>\r\n        </dock-layout>\r\n        <dock-layout>\r\n            <Label dock=\"right\" text=\"محصول :\" width=\"150\" textAlignment=\"right\"></Label>\r\n            <Label textAlignment=\"left\" dock=\"left\" [text]=\"product\"></Label>\r\n        </dock-layout>\r\n    </stack-layout>\r\n</ScrollView>"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/information/information.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InformationComponent", function() { return InformationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./product_file/jsonFile.json");
var _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t("./product_file/jsonFile.json", 1);


var InformationComponent = /** @class */ (function () {
    function InformationComponent() {
    }
    InformationComponent.prototype.ngOnInit = function () {
        this.notificationNum = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.notificationsCode;
        this.notificationDate = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.updatedDateShamsi;
        this.itpNum = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.code;
        this.itpDate = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.itpDate;
        this.programNum = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.code;
        this.programDate = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.code;
        this.fromHour = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.timeFrom;
        this.toHour = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.timeTo;
        this.product = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.productTitle;
    };
    InformationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-information',
            template: __webpack_require__("./home_page/inspection-operation/tabs/information/information.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/information/information.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], InformationComponent);
    return InformationComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/tabs/instance/instance.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\n"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/instance/instance.component.html":
/***/ (function(module, exports) {

module.exports = "<Button text=\"instance works!\" class=\"btn btn-primary\"></Button>"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/instance/instance.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstanceComponent", function() { return InstanceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var InstanceComponent = /** @class */ (function () {
    function InstanceComponent() {
    }
    InstanceComponent.prototype.ngOnInit = function () {
    };
    InstanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-instance',
            template: __webpack_require__("./home_page/inspection-operation/tabs/instance/instance.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/instance/instance.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], InstanceComponent);
    return InstanceComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/tabs/items/items.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\n.drop-down{\n\n    text-align: center;\n    padding:5 5;\n    font-size: 16;\n\n    border-color: #000;\n    border-width: 1;\n    border-style: solid;\n\n}\n.lbl{\n    text-align: center;\n    padding: 10;\n    border-color: #000;\n    border-width: 1;\n    border-style: solid;\n}\n.operation{\n    padding-top: 10;\n    font-size: 20;\n}\n.rtl{\n    direction: rtl;\n}\n.displayRtl{\n    display: flex;\n    flex-direction: column-reverse;\n}\n.savee{\n    background-color: black;\n    color: white;\n    font-size: 12;\n    margin: 5;\n    padding: 10;\n    width: 70;\n}"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/items/items.component.html":
/***/ (function(module, exports) {

module.exports = "<StackLayout orientation=\"vertical\" padding=\"30px\" backgroundColor=\"#8fbc8f\">\r\n    <StackLayout class=\"input-field\">\r\n        <DockLayout>\r\n            <Label style=\"margin-top: 10\" text=\"انتخاب محصول:\" dock=\"right\"></Label>\r\n            <DropDown #dd [items]=\"productTitles\" dock=\"right\"\r\n                      [(ngModel)]=\"index\"\r\n                      (selectedIndexChanged)=\"selectedIndexChanged($event)\"\r\n                      backroundColor=\"white\" color=\"black\" class=\"drop-down\">\r\n            </DropDown>\r\n           <!-- <ListPicker [items]=\"productTitles\" [selectedIndex]=\"index\" (selectedIndexChange)=\"selectedIndexChanged($event)\"></ListPicker>-->\r\n\r\n        </DockLayout>\r\n    </StackLayout>\r\n    <scroll-view orientation=\"vertical\">\r\n        <StackLayout orientation=\"vertical\" *ngIf=\"allow\">\r\n            <stack-layout class=\"hr-dark\"></stack-layout>\r\n            <DockLayout *ngFor=\"let it of itemCharacter; let i=index\">\r\n                <Label dock=\"right\" textAlignment=\"right\" width=\"130\" style=\"margin: 15\" text=\"{{it.title}}\"></Label>\r\n                <text-field [(ngModel)]=\"it.value\" dock=\"left\"></text-field>\r\n            </DockLayout>\r\n            <StackLayout orientation=\"horizontal\">\r\n                <Button class=\"savee\" text=\"افزودن\" (tap)=\"insert()\"></Button>\r\n                <Button class=\"savee\" text=\"مشاهده\" (tap)=\"fetch()\"></Button>\r\n                <Button class=\"savee\" text=\"حذف جدول\" (tap)=\"deleteTable()\"></Button>\r\n                <Button class=\"savee\" text=\"ایجاد جدول\" (tap)=\"create_database()\"></Button>\r\n            </StackLayout>\r\n            <scroll-view orientation=\"vertical\">\r\n                <StackLayout orientation=\"vertical\"  style=\"flex-direction: row-reverse;\">\r\n                    <scroll-view orientation=\"horizontal\">\r\n                        <GridLayout *ngIf=\"show\" [rows]=\"genRows(resultItemChsrschter)\"\r\n                                    [columns]=\"genCols(itemCharacter)\"\r\n                                    horizontalAlignment=\"center\">\r\n                            <Label horizontalAlignment=\"right\" row=\"0\" [col]=\"itemCharacter.length-(i)\"\r\n                                   *ngFor=\"let it of itemCharacter; let i=index\"\r\n                                   text=\"{{it.title}}\"  class=\"lbl\">\r\n                            </Label>\r\n                            <ng-container *ngFor=\"let ite of resultItemChsrschter;let r=index\">\r\n                                <Label text=\"{{fff.value}}\" [row]=\"r+1\" [col]=\"ite.length-(c)\"\r\n                                       *ngFor=\"let fff of ite;let c=index\" class=\"lbl\"></Label>\r\n                                <Label text=\"&#xf2ed;\"color=\"red\" [row]=\"r+1\" class=\"operation\" [col]=\"0\" marginLeft=\"30\" (tap)=\"delete(ite.id)\"></Label>\r\n                                <Label text=\"&#xf044;\" color=\"blue\" [row]=\"r+1\" class=\"operation\"  [col]=\"0\" marginRight=\"30\" (click)=\"edit(ite.id)\"></Label>\r\n                            </ng-container>\r\n                        </GridLayout>\r\n                    </scroll-view>\r\n                </StackLayout>\r\n            </scroll-view>\r\n        </StackLayout>\r\n    </scroll-view>\r\n\r\n</StackLayout>"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/items/items.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ItemsComponent", function() { return ItemsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./product_file/jsonFile.json");
var _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1___namespace = /*#__PURE__*/__webpack_require__.t("./product_file/jsonFile.json", 1);


var Sqlite = __webpack_require__("../node_modules/nativescript-sqlite/sqlite.js");
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent() {
        this.id = 0;
        this.inspectionItem = [];
        this.productTitles = ['...'];
        this.identifyCharacters = [];
        this.itemCharacter = [];
        this.selectedIndex = 0;
        this.allow = false;
        this.show = false;
        this.proTitle = '';
        this.proId = '';
        this.productId = '';
        this.columns = "auto,auto,auto,auto";
        //سthis.deleteTable();
        this.create_database();
    }
    ItemsComponent.prototype.genCols = function (item) {
        var columns = "*,*";
        item.forEach(function (el) {
            columns += ",*";
        });
        return columns;
    };
    ItemsComponent.prototype.genRows = function (item) {
        var rows = "*";
        item.forEach(function (el) {
            rows += ",*";
        });
        return rows;
    };
    ItemsComponent.prototype.create_database = function () {
        var _this = this;
        (new Sqlite("my.db")).then(function (db) {
            db.execSQL("CREATE TABLE IF NOT EXISTS itemTbl (id INTEGER PRIMARY KEY AUTOINCREMENT," +
                " productCharacter TEXT, productName TEXT, productId TEXT)").then(function (id) {
                alert('جدول ایجاد شد');
                _this.database = db;
            }, function (error) {
                console.log("CREATE TABLE ERROR", error);
            });
        }, function (error) {
            console.log("OPEN DB ERROR", error);
        });
    };
    ItemsComponent.prototype.insert = function () {
        this.database.execSQL("INSERT INTO itemTbl (productCharacter,productName,productId) VALUES (?,?,?)", [JSON.stringify(this.itemCharacter), this.proTitle, this.proId]).then(function (id) {
            alert('ثبت شد');
            console.log("INSERT RESULT", id);
        }, function (error) {
            console.log("INSERT ERROR", error);
        });
        this.fetch();
    };
    ItemsComponent.prototype.fetch = function () {
        var _this = this;
        this.database.all("SELECT * FROM itemTbl e where e.productId=" + this.proId).then(function (rows) {
            _this.resultItemChsrschter = [];
            for (var row in rows) {
                _this.resultItemChsrschter.push(JSON.parse(rows[row][1]));
            }
        }, function (error) {
            console.log("SELECT ERROR", error);
        });
        console.log('test:.........', this.resultItemChsrschter);
        this.show = true;
    };
    ItemsComponent.prototype.ngOnInit = function () {
        this.inspectionItem = _product_file_jsonFile_json__WEBPACK_IMPORTED_MODULE_1__.inspectionOperationItems;
        for (var _i = 0, _a = this.inspectionItem; _i < _a.length; _i++) {
            var item = _a[_i];
            this.productTitles.push(item.productTitle);
        }
    };
    ItemsComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        var itemName = picker.items[picker.selectedIndex];
        if (itemName != 0) {
            this.itemCharacter = [];
            var titleIndex = this.inspectionItem.findIndex(function (obj) { return obj.productTitle == itemName; });
            for (var _i = 0, _a = this.inspectionItem[titleIndex].identifyCharacters; _i < _a.length; _i++) {
                var it = _a[_i];
                this.proId = it.productId;
                this.proTitle = it.productTitle;
                this.itemCharacter.push({ title: it.title, value: "", productName: it.productTitle, productId: it.productId });
            }
            this.allow = true;
            this.fetch();
        }
        else {
            this.allow = false;
        }
    };
    ItemsComponent.prototype.deleteTable = function () {
        this.database.execSQL("DROP TABLE itemTbl").then(function (de) {
            alert("جدول مورد نظر حذف شد");
        }, function (error) {
            console.log('errore is...', error);
        });
    };
    ItemsComponent.prototype.delete = function (id) {
        alert(id);
        // this.database.execSQL("DELETE FROM  itemTbl WHERE id="+id).then(de => {
        //     alert("deleted succesfully....");
        // }, error => {
        //     console.log('errore is...', error);
        // });
    };
    ItemsComponent.prototype.edit = function (id) {
        alert(id);
        // this.database.execSQL("DELETE FROM  itemTbl WHERE id="+id).then(de => {
        //     alert("deleted succesfully....");
        // }, error => {
        //     console.log('errore is...', error);
        // });
    };
    ItemsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: "app-items",
            template: __webpack_require__("./home_page/inspection-operation/tabs/items/items.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/items/items.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], ItemsComponent);
    return ItemsComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/tabs/standards/standards.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\n"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/standards/standards.component.html":
/***/ (function(module, exports) {

module.exports = "<Button text=\"standards works!\" class=\"btn btn-primary\"></Button>"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/standards/standards.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StandardsComponent", function() { return StandardsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var StandardsComponent = /** @class */ (function () {
    function StandardsComponent() {
    }
    StandardsComponent.prototype.ngOnInit = function () {
    };
    StandardsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-standards',
            template: __webpack_require__("./home_page/inspection-operation/tabs/standards/standards.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/standards/standards.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], StandardsComponent);
    return StandardsComponent;
}());



/***/ }),

/***/ "./home_page/inspection-operation/tabs/tabs.component.css":
/***/ (function(module, exports) {

module.exports = "#tabViewContainer{\r\n    alignment: right;\r\n}"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/tabs.component.html":
/***/ (function(module, exports) {

module.exports = "<Page xmlns=\"http://schemas.nativescript.org/tns.xsd\">\r\n    <Page.ActionBar>\r\n        <ActionBar>\r\n            <Label class=\"h3 p-15\" text=\"عملیات بازرسی\" textWrap=\"true\"></Label>\r\n        </ActionBar>\r\n    </Page.ActionBar>\r\n    <StackLayout >\r\n        <TabView id=\"tabViewContainer\" selectedIndex=\"5\" class=\"fas\" >\r\n            <StackLayout *tabItem=\"{title: ' &#xf7d9; \\n تجیهزات'}\">\r\ny                <app-equipments></app-equipments>\r\n            </StackLayout>\r\n            <StackLayout *tabItem=\"{title: '&#xf039; \\n استاندارد'}\">\r\n                <StackLayout>\r\n                    <app-standards></app-standards>\r\n                </StackLayout>\r\n            </StackLayout>\r\n            <StackLayout *tabItem=\"{title: '&#xf0ae; \\n چک لیست'}\">\r\n                <StackLayout>\r\n                    <app-check-list></app-check-list>\r\n                </StackLayout>\r\n            </StackLayout>\r\n            <StackLayout *tabItem=\"{title: ' &#xf1fb; \\n معیارنمونه'}\">\r\n                <StackLayout>\r\n                    <app-instance></app-instance>\r\n                </StackLayout>\r\n            </StackLayout>\r\n            <StackLayout *tabItem=\"{title: '&#xf0e8; \\n اقلام'}\">\r\n                <StackLayout>\r\n                    <app-items></app-items>\r\n                </StackLayout>\r\n            </StackLayout>\r\n            <StackLayout  *tabItem=\"{title: ' &#xf05a; \\n اطلاعات '}\">\r\n                <StackLayout>\r\n                    <app-information></app-information>\r\n                </StackLayout>\r\n            </StackLayout>\r\n        </TabView>\r\n    </StackLayout>\r\n</Page>\r\n"

/***/ }),

/***/ "./home_page/inspection-operation/tabs/tabs.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var TabsComponent = /** @class */ (function () {
    function TabsComponent() {
    }
    TabsComponent.prototype.ngOnInit = function () {
    };
    TabsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-tabs',
            template: __webpack_require__("./home_page/inspection-operation/tabs/tabs.component.html"),
            styles: [__webpack_require__("./home_page/inspection-operation/tabs/tabs.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TabsComponent);
    return TabsComponent;
}());



/***/ }),

/***/ "./home_page/setting/setting.component.css":
/***/ (function(module, exports) {

module.exports = "/* Add mobile styles for the component here.  */\n"

/***/ }),

/***/ "./home_page/setting/setting.component.html":
/***/ (function(module, exports) {

module.exports = "<Button text=\"setting works!\" class=\"btn btn-primary\"></Button>"

/***/ }),

/***/ "./home_page/setting/setting.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SettingComponent", function() { return SettingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/@angular/core/fesm5/core.js");

var SettingComponent = /** @class */ (function () {
    function SettingComponent() {
    }
    SettingComponent.prototype.ngOnInit = function () {
    };
    SettingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-setting',
            template: __webpack_require__("./home_page/setting/setting.component.html"),
            styles: [__webpack_require__("./home_page/setting/setting.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], SettingComponent);
    return SettingComponent;
}());



/***/ }),

/***/ "./main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("../node_modules/nativescript-angular/platform.js");
/* harmony import */ var nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app.module.ts");

        let applicationCheckPlatform = __webpack_require__("../node_modules/tns-core-modules/application/application.js");
        if (applicationCheckPlatform.android && !global["__snapshot"]) {
            __webpack_require__("../node_modules/tns-core-modules/ui/frame/frame.js");
__webpack_require__("../node_modules/tns-core-modules/ui/frame/activity.js");
        }

        
            __webpack_require__("../node_modules/nativescript-dev-webpack/load-application-css-angular.js")();
            
            
        if (true) {
            const hmrUpdate = __webpack_require__("../node_modules/nativescript-dev-webpack/hmr/index.js").hmrUpdate;
            global.__initialHmrUpdate = true;
            global.__hmrSyncBackup = global.__onLiveSync;

            global.__onLiveSync = function () {
                hmrUpdate();
            };

            global.hmrRefresh = function({ type, path } = {}) {
                if (global.__initialHmrUpdate) {
                    return;
                }

                setTimeout(() => {
                    global.__hmrSyncBackup({ type, path });
                });
            };

            hmrUpdate().then(() => {
                global.__initialHmrUpdate = false;
            })
        }
        
            
        __webpack_require__("../node_modules/tns-core-modules/bundle-entry-points.js");
        

var options_Generated = {};

if (true) {
    options_Generated = {
        hmrOptions: {
            moduleTypeFactory: function () { return __webpack_require__("./app.module.ts").AppModule; },
            livesyncCallback: function (platformReboot) { setTimeout(platformReboot, 0); }
        }
    };
}

if (true) {
    module["hot"].accept(["./app.module.ts"], function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _app_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./app.module.ts");
(function () {
        global["hmrRefresh"]({});
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); });
}
nativescript_angular_platform__WEBPACK_IMPORTED_MODULE_0__["platformNativeScriptDynamic"](Object.assign({}, options_Generated)).bootstrapModule(_app_module__WEBPACK_IMPORTED_MODULE_1__["AppModule"]);

    
        
        
    
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./package.json":
/***/ (function(module) {

module.exports = {"android":{"v8Flags":"--expose_gc"},"main":"main.js"};

/***/ }),

/***/ "./product_file/jsonFile.json":
/***/ (function(module) {

module.exports = {"id":804,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/10","itpId":582,"productId":205,"productTitle":"غذای2222۲","itpTitle":"آی تی بی 9090909(1)","agreementSubjectTitle":"موضوع جدید خرداد","proficiencyGroupId":64,"proficiencyGroupTitle":"خودرویی","notificationsId":795,"notificationsCode":"NoVH97-0002","notificationsTitle":"aaaaaaaaaaaaa","dateFrom":"1398/02/01","dateTo":"1398/12/01","timeFrom":"01:00","timeTo":"08:00","cityId":41225,"cityTopic":"تهران","stateId":41214,"stateTopic":"تهران","address":null,"operationRequirement":null,"catcher":null,"code":"TC139712VH072P02","itpDate":"1397/12/19","status":3,"statusTitle":"approved","statusPersianTitle":"تائید مدیر گروه","reasonDescription":null,"mainCatcher":"aaaaa","purposeInspection":"aaaaa","supplierId":null,"supplierName":null,"employerId":63,"employerName":"شرکت تست یک","supplierHierarchyCode":null,"supplierKind":null,"notificationInspectionType":0,"notificationInspectionTypeTitle":"project","notificationInspectionTypePersianTitle":"سامانه ای","inspectionOperationItems":[{"id":202,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","inspectionOperationId":804,"inspectionOperationCode":"TC139712VH072P02","notificationItemId":324,"identifyCharacters":[{"id":761,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","productId":205,"productTitle":"غذای2222۲","title":"شاسی محصول"},{"id":762,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","productId":205,"productTitle":"غذای2222۲","title":"مشخصات محصول"},{"id":763,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","productId":205,"productTitle":"غذای2222۲","title":"کدمحصول"},{"id":764,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","productId":205,"productTitle":"غذای2222۲","title":"شرح محصول"}],"notificationId":795,"productId":205,"productTitle":"غذای2222۲","itpInspectionRanges":[{"id":663,"version":0,"createdDateShamsi":"1397/12/19","updatedDateShamsi":"1398/01/24","itpId":582,"inspectionRangeId":308,"inspectionRangeTitle":"مورد بازرسی نمونه 1","inspectionRangeFullTitle":"گروه خودرویی - بعد - بازرسی از محصول - بازرسی از نمونه های ساخته شده  - مورد بازرسی نمونه 1 ","itpStatus":2,"itpStatusTitle":"accepted","itpStatusPersianTitle":"تایید شده","responsibleEmployer":[{"index":1,"title":"W","persianTitle":" W : Witness Point"}],"responsibleContracts":[{"index":1,"title":"W","persianTitle":" W : Witness Point"}],"responsibleTpis":[{"index":2,"title":"SW","persianTitle":"SW : Spot Witness"}],"references":[{"id":50033,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50033,"topic":"مرجع/معیار۲","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17142,"parentTopic":"مرجع/معیار","description":null,"active":true,"lock":null,"isDefault":null}],"tools":[{"id":50035,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50035,"topic":"تجهیزات/ابزار/اسناد۱2","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17143,"parentTopic":"تجهیزات/ابزار/اسناد","description":null,"active":true,"lock":null,"isDefault":null}],"allResponsibleContractsTitle":"W","allResponsibleTpisTitle":"SW","allResponsibleEmployerTitle":"W","allReferencesTopic":"مرجع/معیار۲","allToolsTopic":"تجهیزات/ابزار/اسناد۱2"},{"id":685,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","itpId":582,"inspectionRangeId":304,"inspectionRangeTitle":"نمایش طرح 1","inspectionRangeFullTitle":"گروه خودرویی - قبل - نمایش مستندات - نمایش طرح های اولیه - نمایش طرح 1 ","itpStatus":2,"itpStatusTitle":"accepted","itpStatusPersianTitle":"تایید شده","responsibleEmployer":[{"index":1,"title":"W","persianTitle":" W : Witness Point"}],"responsibleContracts":[{"index":0,"title":"H","persianTitle":" H : Hold Point"}],"responsibleTpis":[{"index":0,"title":"H","persianTitle":" H : Hold Point"}],"references":[{"id":50032,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50032,"topic":"مرجع/معیار۱","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17142,"parentTopic":"مرجع/معیار","description":null,"active":true,"lock":null,"isDefault":null},{"id":50033,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50033,"topic":"مرجع/معیار۲","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17142,"parentTopic":"مرجع/معیار","description":null,"active":true,"lock":null,"isDefault":null}],"tools":[{"id":50034,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50034,"topic":"تجهیزات/ابزار/اسناد۱","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17143,"parentTopic":"تجهیزات/ابزار/اسناد","description":null,"active":true,"lock":null,"isDefault":null}],"allResponsibleContractsTitle":"H","allResponsibleTpisTitle":"H","allResponsibleEmployerTitle":"W","allReferencesTopic":"مرجع/معیار۱ - مرجع/معیار۲","allToolsTopic":"تجهیزات/ابزار/اسناد۱"}],"specification":"ششششش","counts":111,"reNotificationId":null,"reNotificationTitle":null,"reInspection":null},{"id":203,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","inspectionOperationId":804,"inspectionOperationCode":"TC139712VH072P02","notificationItemId":324,"identifyCharacters":[{"id":761,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","productId":206,"productTitle":"ماشین زرهی","title":"شاسی ماشین"},{"id":762,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","productId":206,"productTitle":"ماشین زرهی","title":"مشخصات ماشین"},{"id":763,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","productId":206,"productTitle":"ماشین زرهی","title":"کدماشین"}],"notificationId":795,"productId":206,"productTitle":"ماشین زرهی","itpInspectionRanges":[{"id":663,"version":0,"createdDateShamsi":"1397/12/19","updatedDateShamsi":"1398/01/24","itpId":582,"inspectionRangeId":308,"inspectionRangeTitle":"مورد بازرسی نمونه 1","inspectionRangeFullTitle":"گروه خودرویی - بعد - بازرسی از محصول - بازرسی از نمونه های ساخته شده  - مورد بازرسی نمونه 1 ","itpStatus":2,"itpStatusTitle":"accepted","itpStatusPersianTitle":"تایید شده","responsibleEmployer":[{"index":1,"title":"W","persianTitle":" W : Witness Point"}],"responsibleContracts":[{"index":1,"title":"W","persianTitle":" W : Witness Point"}],"responsibleTpis":[{"index":2,"title":"SW","persianTitle":"SW : Spot Witness"}],"references":[{"id":50033,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50033,"topic":"مرجع/معیار۲","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17142,"parentTopic":"مرجع/معیار","description":null,"active":true,"lock":null,"isDefault":null}],"tools":[{"id":50035,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50035,"topic":"تجهیزات/ابزار/اسناد۱2","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17143,"parentTopic":"تجهیزات/ابزار/اسناد","description":null,"active":true,"lock":null,"isDefault":null}],"allResponsibleContractsTitle":"W","allResponsibleTpisTitle":"SW","allResponsibleEmployerTitle":"W","allReferencesTopic":"مرجع/معیار۲","allToolsTopic":"تجهیزات/ابزار/اسناد۱2"},{"id":685,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","itpId":582,"inspectionRangeId":304,"inspectionRangeTitle":"نمایش طرح 1","inspectionRangeFullTitle":"گروه خودرویی - قبل - نمایش مستندات - نمایش طرح های اولیه - نمایش طرح 1 ","itpStatus":2,"itpStatusTitle":"accepted","itpStatusPersianTitle":"تایید شده","responsibleEmployer":[{"index":1,"title":"W","persianTitle":" W : Witness Point"}],"responsibleContracts":[{"index":0,"title":"H","persianTitle":" H : Hold Point"}],"responsibleTpis":[{"index":0,"title":"H","persianTitle":" H : Hold Point"}],"references":[{"id":50032,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50032,"topic":"مرجع/معیار۱","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17142,"parentTopic":"مرجع/معیار","description":null,"active":true,"lock":null,"isDefault":null},{"id":50033,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50033,"topic":"مرجع/معیار۲","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17142,"parentTopic":"مرجع/معیار","description":null,"active":true,"lock":null,"isDefault":null}],"tools":[{"id":50034,"version":0,"createdDateShamsi":"1378/02/22","updatedDateShamsi":"1378/02/22","code":50034,"topic":"تجهیزات/ابزار/اسناد۱","secondTopic":null,"masterInformationId":null,"masterInformationTopic":null,"masterInformationCode":null,"parentId":17143,"parentTopic":"تجهیزات/ابزار/اسناد","description":null,"active":true,"lock":null,"isDefault":null}],"allResponsibleContractsTitle":"H","allResponsibleTpisTitle":"H","allResponsibleEmployerTitle":"W","allReferencesTopic":"مرجع/معیار۱ - مرجع/معیار۲","allToolsTopic":"تجهیزات/ابزار/اسناد۱"}],"specification":"ششششش","counts":111,"reNotificationId":null,"reNotificationTitle":null,"reInspection":null}],"inspectionCheckLists":[{"id":809,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","inspectionOperationId":804,"checkListId":552,"checkListTitle":"چک لیست خودروهای سواری سبک تولید داخل","checkListCode":"85963","checkListOrganizationProficiencyGroupTitle":null,"checkListAnswerId":null}],"inspectionStandards":[{"id":465,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","inspectionOperationId":804,"standardId":204,"standardTitle":"test New02 edited"}],"inspectionEquipments":[{"id":342,"version":0,"createdDateShamsi":"1398/02/08","updatedDateShamsi":"1398/02/08","inspectionOperationId":804,"equipmentId":82,"equipmentTitle":"کاتالیزو","equipmentCode":null}]};

/***/ })

/******/ });