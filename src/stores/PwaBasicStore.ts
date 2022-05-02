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

let currentChapDBRef: DatabaseReference;

export const temporaryCloudStore = defineStore('pwaCloudStore', {

  state: () => ({
    content: "",
    title: "",
  }),

  actions: {
    setChapCloudContent(chapContent: string) {
      this.content = chapContent;
    },
    getChapCloudContent() {
      return this.content;
    },
    setChapCloudTitle(chapTitle: string) {
      this.title = chapTitle;
    },
    getChapCloudTitle() {
      return this.title;
    },
    setChapCloudRef(ID: DatabaseReference) {
      currentChapDBRef = ID;
    },
    getChapCloudRef() {
      return currentChapDBRef;
    },
  },
})

let currentDocument: TextEditorSubject;
let currentDataBaseRef: DatabaseReference;
let vueDocSpaceApp: App<Element>;

export const localStore = defineStore('pwaLocalStore', {

  state: () => ({
    title: "",
    childs: [[""]],
    databaseNames: [""],
    currentChapterText: [""],
    docActive: true,
  }),

  actions: {

    assignTitle(docTitle: string) {
      this.title = docTitle;
    },

    getTitle() {
      return this.title;
    },

    addChild(title: string, databaseID: string) {
      this.childs.push([title, databaseID]);
    },

    addDBName(name: string) {
      this.databaseNames.push(name);
    },

    assignCurrentDoc(doc: TextEditorSubject) {
      currentDocument = doc;
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

    assignCurrentDB(database: DatabaseReference) {
      currentDataBaseRef = database;
    },
    getCurrentDBRef() {
      return currentDataBaseRef;
    },
  },
})