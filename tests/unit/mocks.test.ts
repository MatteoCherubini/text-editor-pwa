/*import * as mocks from "./mocks";

//import { TextEditorPwaRoute } from '@/router/index';
import { RouteRecordRaw } from "vue-router";

//import {Document, Chapter} from "@/components/textEditorLibrary"

describe("Observer and Subject functions", () => {
    let obs1: any;
    let obs2: any;
    let subj: any;

    beforeEach(() => {
        obs1 = new mocks.ObserverMock([]);
        obs2 = new mocks.ObserverMock(["path1", "path2"]);

        subj = new mocks.SubjectMock([obs1],[]);
    })

    test("update and get route test", () => {
        obs1.updateRouteList("path");
        expect(obs1.getRoute()).toEqual(["path"]);
    })

    test("attach and detach observer test", () => {

        expect(subj.getObserverList().length).toEqual(1);

        subj.attachObserver(obs2);
        expect(subj.getObserverList().length).toEqual(2);

        subj.detachObserver(obs2);
        expect(subj.getObserverList().length).toEqual(1);
    })

    test("update and get child route list test ", () => {
        expect(subj.getRouteList()).toEqual([]);
        subj.addToRouteList("path");
        expect(subj.getRouteList()).toEqual(["path"]);
    })

    test("notify and update test ", () => {
        expect(obs1.getRoute().length).toEqual(0);
        subj.notifyObserver("path");
        expect(obs1.getRoute().length).toEqual(1);
    })
})

/*describe("Route functions", () => {
    let route: any;
    let obs: any;

    beforeEach(() => {
        obs = new mocks.ObserverMock([]);
        //route = new TextEditorPwaRoute([],[]);
        route.attachObserver(obs);       
    })

    test("route tests", () => {
        expect(route.getRouteList()).toEqual([]);
        const child: RouteRecordRaw = {
              path: '',
              redirect: '/docs/demo'
            };
        route.childrenRoute(child,"demo");
        expect(route.getRouteList()).toEqual(["demo"]);
    })
})*/

/*describe("Page and Chapter functions", () => {
    let route: any;
    let page: any;
    let obs: any;
    let chapter: any;
    const ID="ID"

    beforeEach(() => {
        obs = new mocks.ObserverMock([]);
        //route = new TextEditorPwaRoute([obs],[]);
        page = new Document("First Page",obs,[""]);// route
        chapter = new Chapter("Chapter 1", ID)      
    })

    test("Page get chapter test", () => {
        expect(page.getChapters().length).toEqual(0);
        page.makeChapter("Chapter 1", ID);
        expect(page.getChapters().length).toEqual(1);
    })

    test("Page create document test", () => {
        expect(obs.getRoute().length).toEqual(1);
        expect(page.getRouteList().length).toEqual(1);

        page.createDocument();

        expect(obs.getRoute().length).toEqual(2); //route 
        expect(page.getRouteList().length).toEqual(2); //equals to route
    })
})

describe("Menu functions", () => {
    let route: any;
    let obs: any;
    let menu: any;

    beforeEach(() => {
     
    })

    test("route tests", () => {

    })
})*/