const {test , expect} = require("@jest/globals") ; 
const {normalizeURL , getURLsFromHTML} = require("./crawl.js") ; 


test("normalizeURL slash" , () =>{
    const url =  "http://m.inpt.ac.ma/my"  ; 
    const actual = normalizeURL(url) ; 
    const expected = "m.inpt.ac.ma/my" ; 
    expect(actual).toEqual(expected) ; 

})


test("normalizeURL Capital" , () =>{
    const url =  "http://m.INPT.ac.ma/my"  ; 
    const actual = normalizeURL(url) ; 
    const expected = "m.inpt.ac.ma/my" ; 
    expect(actual).toEqual(expected) ; 

})

test("getURLsFromHTML" , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="http://m.INPT.ac.ma/my">
                Click Here , You are in INPT 
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "http://m.INPT.ac.ma/my" ; 
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL) ; 
    const expected = ["http://m.inpt.ac.ma/my"] ;
    expect(actual).toEqual(expected) ; 
})



test("getURLsFromHTML absolute" , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="http://m.INPT.ac.ma/my/hy">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "http://m.INPT.ac.ma/my/hy" ; 
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL) ; 
    const expected = ["http://m.inpt.ac.ma/my/hy"] ;
    expect(actual).toEqual(expected) ; 
})





test("getURLsFromHTML relative" , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/Oko/Ok/id">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `
    const inputBaseURL = "http://m.inpt.ac.ma" ; 
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL) ; 
    const expected = ["http://m.inpt.ac.ma/Oko/Ok/id"] ;
    expect(actual).toEqual(expected) ; 
})


test("getURLsFromHTML Both" , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/Oko/Ok/id">
                Boot.dev Blog
            </a>
             <a href="http://m.INPT.ac.ma/my/hy">
               This is INPT !!
            </a>

        </body>
    </html>
    `
    const inputBaseURL = "http://m.inpt.ac.ma" ; 
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL) ; 
    const expected = ["http://m.inpt.ac.ma/Oko/Ok/id","http://m.inpt.ac.ma/my/hy"] ;
    expect(actual).toEqual(expected) ; 
})


test("getURLsFromHTML Invalid" , () =>{
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                Why Not 
            </a>


        </body>
    </html>
    `
    const inputBaseURL = "http://m.inpt.ac.ma" ; 
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL) ; 
    const expected = [] ;
    expect(actual).toEqual(expected) ; 
})






