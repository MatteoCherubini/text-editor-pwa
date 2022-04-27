import { defineStore } from "pinia";

import { RouteRecordRaw, } from 'vue-router';
import { TextEditorSubject } from "@/components/textEditorLibrary";
import { DatabaseReference, } from "firebase/database";

import { App, } from 'vue';

type ChildrenRoutes = {
  route: RouteRecordRaw[];
};

export const globalRoute = defineStore('pwaRouteStore', {

  state: () => ({
    route: [],
  } as ChildrenRoutes),

  actions: {

    addRoute(route: RouteRecordRaw) {
      this.route.push(route);
    },

    assignRoute(routes: RouteRecordRaw[]) {
      this.route = routes;
    }

  },
})

let currentDocument: TextEditorSubject;
let currentDataBaseRef: DatabaseReference;
let documentChapterTextMatrix: string[][];
let vueDocSpaceApp: App<Element>;

export const localStore = defineStore('pwaLocalStore', {

  state: () => ({
    childs: [[""]],
    databaseNames: [""],
    currentChapterText: [""],
    docActive: true,
  }),

  actions: {

    addChild(title: string, databaseID: string) {
      this.childs.push([title, databaseID]);
    },

    addDBName(name: string) {
      this.databaseNames.push(name);
    },

    assignCurrentDoc(doc: TextEditorSubject) {
      currentDocument = doc;
    },

    assignCurrentDB(database: DatabaseReference) {
      currentDataBaseRef = database;
    },

    getCurrentDoc() {
      return currentDocument;
    },

    assignVueDocApp(vueDocApp: App<Element>) {
      vueDocSpaceApp = vueDocApp;
    },

    getVueDocApp() {
      return vueDocSpaceApp;
    },

    isDocActive() {
      return this.docActive;
    },

    assignDocActive(flag: boolean) {
      this.docActive = flag;
    },

    getCurrentDBRef() {
      return currentDataBaseRef;
    },

    appendChapter() {
      if (documentChapterTextMatrix != null) {
        documentChapterTextMatrix.push([this.currentChapterText[0], this.currentChapterText[1]]);
      }
      else if (this.currentChapterText[0] != "" && this.currentChapterText[1] != "") {
        documentChapterTextMatrix = [[this.currentChapterText[0], this.currentChapterText[1]]];
      }
    },

    getChapterMatrix() {
      return documentChapterTextMatrix;
    },

    assignChapterMatrix(title: string, content: string) {
      documentChapterTextMatrix = [[title], [content]];
    },

    clearChapterMatrixOnceSaved() {
      documentChapterTextMatrix = [];
      this.currentChapterText = ["", ""];
    }

  },
})