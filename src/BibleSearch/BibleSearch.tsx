import { useEffect, useState } from "react"

interface Bible {
    verseText: string,
    book: string,
    chapter: number,
    verse: number
}

const BibleSearch = () => {

    const [verse, setVerse] = useState<Bible>({
        verseText: '',
        book: '',
        chapter: 0,
        verse: 0
    })

    useEffect(() => {
        getVerse()
    }, [verse.verse])

    const getVerse = async () => {
        const response = await fetch(`https://bible-api.com/${verse.verse}`)
        // Working on 403 error
        if (response.ok) {
            const data = await response.json()
            setVerse({
                verseText: data.text,
                book: data.verses[0].book_name,
                chapter: data.verses[0].chapter,
                verse: data.verses[0].verse
            })
        }
    }
    return (
        <>
            <h1 className="text-center">What verse would you like to search?</h1>
            <div className="w-25 mx-auto">
                <input onChange={(event) => { setVerse({ ...verse, verseText: event.target.value }) }} type="text" id="searchText" />
            </div>

            {verse.verseText &&
                <div className="card" style={{ width: '18rem' }}>
                    <div className="card-body">
                        <h5 className="card-title">{verse.book}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{verse.chapter}: {verse.verse}</h6>
                        <p className="card-text">{verse.verseText}</p>
                    </div>
                </div>
            }
        </>
    )
}
export default BibleSearch