import {createApp,} from 'vue';
import PwaChapterArea from '@/components/textEditorComponent.vue';


export abstract class TextEditorComponent {

  private title: string;

  constructor(title: string) {
    this.title=title;
  }

  public setTitle (newTitle: string){
    this.title = newTitle;
    return this;
  }

  public getTitle () {
    return this.title;
  }
}


export class Chapter extends TextEditorComponent {

  constructor(title: string, idContainer: string){
    super(title);
    this.addDomChapter(idContainer);//container
  }

  public getChapter(){
    return this;
  }

  private addDomChapter(idContainer: string){//container: Element   

    const container = document.querySelector('#chapter-container');

    const mountNode = document.createElement('div');
    mountNode.id = 'mount-node';

    container?.appendChild(mountNode);


    console.log("prova");

    createApp(PwaChapterArea, {title: this.getTitle() }).mount('#mount-node');

    mountNode.removeAttribute('id');
  }

}

export class Page extends TextEditorComponent {

  private chapters: TextEditorComponent [] = [];

  constructor(title: string){
    super(title);
  }
  public add (component: TextEditorComponent){
    this.chapters.push(component);
  }

  public getChapters(){
    return this.chapters;
  }

  public makeChapter(title: string, idContainer: string) { // factory method
    return new Chapter (title, idContainer);
  }
/*
  private makePage(title: string) {
    
  }
*/
}
