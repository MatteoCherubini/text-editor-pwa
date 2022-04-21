//Imports
import { createApp } from 'vue';
import PwaChapterArea from '@/components/TextEditorComponent.vue';
//import { Filesystem, Directory, Encoding, } from '@capacitor/filesystem';
import { firebaseApp } from '@/firebase';
import { push, getDatabase, ref, get, Database, DatabaseReference, } from 'firebase/database';
import { localStore } from '@/stores/PwaBasicStore';
import { createPinia } from 'pinia';

import PwaDocument from "@/components/CurrentDocument.vue";

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
  makeDocument(title: string): void;
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

  protected CloudID(ID: string){
    this.cloudID = ID;
    return this;
  }

  public makeChapter(title: string, idContainer: string) {
    console.log("building new chapter...");
    const chap = new Chapter(title, idContainer);
    return chap;
  }

  public mountDocument() { //not a good strategy!!

    if (localStore().isDocActive()) {
      localStore().assignDocActive(false);
      const div = document.createElement("div");
      div.setAttribute("class", "PWAdoc");
      div.setAttribute("id", "main-content");
      document.querySelector('#main-content')?.replaceWith(div);
      localStore().assignDocActive(true);
      createApp(PwaDocument).use(createPinia()).mount("#main-content");
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

  private firebaseDB;// = getDatabase(firebaseApp);//********************************/

  constructor(title: string, dbChild: string[][], databaseRef: DatabaseReference) {
    super(title, dbChild);
    if (databaseRef != null) {
      //this.firebaseDB = databaseRef;
      console.log("databaseRef.key == " + databaseRef.key!)
      this.CloudID(databaseRef.key!)
      this.continueOldDoc();
    }
    else {
      this.firebaseDB = getDatabase(firebaseApp);
      this.makeDocument(title);
    }

  }

  makeDocument(title: string): void {
    //this.addNewDocument();
    console.log("New Document created");

    localStore().assignCurrentDB(push(
      ref(this.firebaseDB!, "/"), { title: title, content: [[""]] })
    );
  }

  private continueOldDoc() {
    //this.addNewDocument();///////////////////////////////////?
    console.log("Old Document opened");

    /*localStore().assignCurrentDB(push(
      ref(this.firebaseDB, "/"), { title: title, content: [[""]] })
    );*/
  }
}

export class menuCloudDocStrategy extends Document implements makeDocStrategy {

  constructor(title: string, dbChild: string[][]) {
    super(title, dbChild);
    this.makeDocument(title);
  }

  makeDocument(title: string): void {
    console.log("Loading Document...");

    get(localStore().getCurrentDBRef()).then((snapshot) => {
      console.log(snapshot.val());
      (<HTMLInputElement>document.getElementById('PWAdocTitle')!).textContent = snapshot.child("title").val();

      const array = snapshot.child("content").val();

      for (let i = 0; i < array.length; i++) {
        localStore().assignChapterMatrix(snapshot.child("content/" + i + "/0").val(), snapshot.child("content/" + i + "/1").val());
        new CloudChapter(snapshot.child("title").val(), "#chapter-container");
      }

      localStore().clearChapterMatrixOnceSaved();
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

    createApp(PwaChapterArea).use(createPinia()).mount("#mount-node");

    mountNode.removeAttribute("id");
  }
}

class CloudChapter extends TextEditorComponent {


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

    console.log(createApp(PwaChapterArea).use(createPinia()).mount("#mount-node"));

    mountNode.removeAttribute("id");
  }
}


//start JavaScript functions

function makeHTML(title: string, matrix: string[][]) {
  // generates an HTML file with page contents and saves it into the database

  let htmlContent = "";
  matrix.forEach(chap => htmlContent
    = htmlContent + "<h2>" + chap[0]
    + "</h2> <p style='padding-left:10%;'>" + chap[1] + "</p> <br> <br>");

  htmlContent =
    "<html> <h1 style='text-align:center;'>"
    + title + "</h1> " + htmlContent + "</html>";

  /*console.log("accesso al DataBase: " + this.firebaseRef);
  push(this.firebaseRef, { title: title, content: htmlContent });*/


  /*
      await Filesystem.writeFile({
        path: "" + title + ".html",
        data: htmlContent,
        directory: Directory.Documents,//for android
        encoding: Encoding.UTF8,
      });
  */
}
