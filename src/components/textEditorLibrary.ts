//Imports
import { createApp } from 'vue';
//import { Filesystem, Directory, Encoding, } from '@capacitor/filesystem';
import { ref, get, DatabaseReference, push, getDatabase, } from 'firebase/database';
import { localStore, temporaryCloudStore } from '@/stores/PwaBasicStore';

import PwaChapterArea from '@/components/TextEditorComponent.vue';
import PwaDocument from "@/components/CurrentDocument.vue";
import { firebaseApp } from '@/firebase';

//start abstract object definitions:
export abstract class TextEditorComponent {

  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  protected abstract addToDOM(idContainer: string): void;

  public setTitle(newTitle: string) {
    this.title = newTitle;
    return this;
  }

  public getTitle() {
    return this.title;
  }
}

export abstract class TextEditorSubject {
  protected dbChildList: string[][];

  constructor(dbChild: string[][]) {
    this.dbChildList = dbChild;
  }

  public getRouteList() {
    return this.dbChildList;
  }

  public addToRouteList(childPath: string, databaseChildID: string) {
    this.dbChildList.push([childPath, databaseChildID]);
  }
}

export interface makeDocStrategy {
  makeDocument(): void;
}

abstract class Document extends TextEditorSubject {

  protected docTitle: string;
  private cloudID = "";

  constructor(title: string, dbChild: string[][]) {
    super(dbChild);
    this.docTitle = title;
  }

  public getDocTitle() {
    return this.docTitle;
  }

  public getCloudID() {
    return this.cloudID;
  }

  public CloudID(ID: string) {
    this.cloudID = ID;
    return this;
  }

  public makeChapter(title: string, idContainer: string) {
    console.log("building new chapter...");
    temporaryCloudStore().setChapCloudRef(
      push(ref(getDatabase(firebaseApp), "/" + localStore().getCurrentDBRef().key + "/content"), {
        title: "",
        content: "",
      })
    );
    const chap = new Chapter(title, idContainer);
    return chap;
  }

  public mountDocument() { //not a good strategy!!

    if (localStore().isDocActive()) {
      localStore().assignDocActive(false);
      const div = document.createElement("div");
      div.setAttribute("class", "PWAdoc");
      div.setAttribute("id", "doc-main-content");
      document.querySelector('#doc-main-content')?.replaceWith(div);
      localStore().assignDocActive(true);
      createApp(PwaDocument).mount("#doc-main-content");
    }

    else {
      localStore().assignDocActive(true);
      localStore().getVueDocApp().mount("#main-content");
    }
  }
}
//end

//start concrete object definitions:
export class menuNewDocStrategy extends Document implements makeDocStrategy {

  private firebaseDB;

  constructor(title: string, dbChild: string[][], databaseRef: DatabaseReference) {
    super(title, dbChild);
    this.firebaseDB = databaseRef;
    this.makeDocument();
  }

  makeDocument(): void {
    this.CloudID(this.firebaseDB.key!);
  }
}

export class menuCloudDocStrategy extends Document implements makeDocStrategy {

  constructor(title: string, dbChild: string[][]) {
    super(title, dbChild);
    this.makeDocument();
  }

  makeDocument(): void {
    console.log("Loading Document...");

    get(localStore().getCurrentDBRef()).then((snapshot) => {
      (<HTMLInputElement>document.getElementById('PWAdocTitle')!).textContent = snapshot.child("title").val();
      snapshot.child("content").forEach(function (childSnapshot) {

        temporaryCloudStore().setChapCloudTitle(childSnapshot.child("title").val());
        temporaryCloudStore().setChapCloudContent(childSnapshot.child("content").val());
        temporaryCloudStore().setChapCloudRef(childSnapshot.ref);

        new Chapter(childSnapshot.child("title").val(), "#chapter-container");
      });
      localStore().assignCurrentDoc(new menuNewDocStrategy(this.docTitle, this.dbChildList, localStore().getCurrentDBRef()));
    })
  }
}

class Chapter extends TextEditorComponent {

  constructor(title: string, idContainer: string) {
    super(title);
    this.addToDOM(idContainer);
  }

  protected addToDOM(idContainer: string): void {

    const container = document.querySelector(idContainer);

    const mountNode = document.createElement("div");
    mountNode.id = "mount-node";

    container?.appendChild(mountNode);

    console.log("added a chapter");
    createApp(PwaChapterArea).mount("#mount-node");
    mountNode.removeAttribute("id");
  }
}