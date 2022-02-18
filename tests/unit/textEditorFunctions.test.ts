/*import * as textEditorFunctions from "../../src/components/textEditorFunctions"
describe("textEditorFunctions.Page.getChapters", () => {
    let instPage: any
    let instChapt: any

    beforeEach(() => {
        instPage = new textEditorFunctions.Page("test_page");
        //instChapt = new textEditorFunctions.Chapter("generic_title");
    })

    test("0", () => {
        let result: any = instPage.getChapters()
        expect(result).toEqual([])
    })

    test("1", () => {
        instPage.add(instChapt);

        let result: any = instPage.getChapters()
        expect(result).toEqual([{ title: "generic_title" }])//-------------------------------------------da testare----------------------------------------------
    })

    test("2", () => {
        let result: any = instChapt.getChapter()
        expect(result).toMatchObject({ title: "generic_title" })
    })
})


*/