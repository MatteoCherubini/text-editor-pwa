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

    /*assignChild(routes: string[]) {
      this.childs = routes;
    },*/

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
      console.log(this.docActive);
    },

    getCurrentDBRef() {
      return currentDataBaseRef;
    },

    appendChapter() {
      if (documentChapterTextMatrix != null) {
        console.log("matrice aumentata");
        documentChapterTextMatrix.push([this.currentChapterText[0], this.currentChapterText[1]]);
      }
      else if (this.currentChapterText[0] != "" && this.currentChapterText[1] != "") {
        console.log("matrice nuova");
        documentChapterTextMatrix = [[this.currentChapterText[0], this.currentChapterText[1]]];
      }
      else {
        console.log("matrice vuota");
      }
    },

    getChapterMatrix() {
      return documentChapterTextMatrix;
    },

    assignChapterMatrix(title: string, content: string) {
      documentChapterTextMatrix = [[title], [content]];
    },

    clearChapterMatrixOnceSaved() {
      console.log("reset matrice");
      documentChapterTextMatrix = [];
      this.currentChapterText = ["", ""];
    }

  },
})