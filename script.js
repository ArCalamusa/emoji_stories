// # Fase di preparazione
// Raccogliamo gli eleemnti di interessa dalla home
const mainSection = document.querySelector('main')
const nameField = document.querySelector('input')
const emojiElements = document.querySelectorAll('.emoji')
const generateButton = document.querySelector('#generate')
// pagina result
const storyTitle = document.querySelector('.story-title')
const storyText = document.querySelector('.story-text')
const homeButton = document.querySelector('#home')
const continueButton = document.querySelector('#continue')

// variabile lista emoji scelte
const selectedEmojis = []

// lista dei messaggi
const chatMessages = []

// endpoint chatGTP
const endpoint = ''

// API KEY
const API_KEY = ''

// LA MIA FUNZIONE funzione che colora le emoji selezionale
function colorSelectedEmojis() {
    for (const element of emojiElements) {
        //recupero l'emoji di ogni elemento
        const emoji = element.innerText
        // se l'emoji è nella lista delle selezionate
        if (selectedEmojis.includes(emoji)) {
            //Aggiungi la classe selected
            element.classList.add('selected')
        } else {
            //rimuovi (se c'è la classe selected)
            element.classList.remove('selected')
        }
    }
}

// funzione crea storia
async function createStory(prompt) {
    // aggiungo prompt a lista messaggi
    chatMessages.push(prompt)

    //mostro schermata caricamento
    mainSection.className = 'loading'

    // || chiamata GPT
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: chatMessages,
            temperature: 0.7
        })
    });
    // elaboriamo la risposta
    const data = await response.json();

    //recupero la storia
    const story = JSON.parse(data.choices[0].message.content)

    console.log(story)

    // inserisco la storia nella lista dei messaggi
    chatMessages.push({
        role: 'assistant',
        content: JSON.stringify(story)
    })

    // inserisco la storia all'interno della pagina
    storyTitle.innerText = story.title
    storyText.innerText = story.text

    // mostra la schermata result
    mainSection.className = 'result'
}

// # Fase gestione eventi
// per ogni elemento degli elementi emoji
for (const element of emojiElements) {
    // stai attento se qualcuno clicca l'elemento
    element.addEventListener('click', function () {
        //recupero emoji
        const clickedEmoji = element.innerText
        // controllo emoji univoca
        if (selectedEmojis.includes(clickedEmoji)) {
            console.warn(`Emoji ${clickedEmoji} già presente`)
            return
        }
        //la inserisco nella lista
        selectedEmojis.push(clickedEmoji)
        // se ci sono più di 3 emoji cancello la più vecchia
        if (selectedEmojis.length > 3) {
            console.warn('troppe emoji, tolgo la prima')
            selectedEmojis.shift()
        }

        //colora elemento cliccato in lista richiamando la mia funzione "colorSelectedEmojis"
        colorSelectedEmojis()

        console.log(selectedEmojis)
    })
}

// AL CLICK DEL BOTTONE "GENERA"
generateButton.addEventListener('click', async function () {
    //recupero del nome del protagonista
    const name = nameField.value

    // controllo se mancano elementi
    if (selectedEmojis.length < 3 || name.length < 2) {
        window.alert('Devi selezionare 3 emoji ed inserire un nome')
        return
    }

    // messaggio iniziale (istruzione)
    const prompt = {
        role: 'user',
        content: `Crea una storia a partire da queste emoji: ${selectedEmojis}. Il protagonista della storia si chiama ${name}. La storia deve essere breve e avere un titolo, anche questo molto breve. Le tue risposte sono solo in formato JSON come questo esempio:

        {
            "title": "Incontro intergalattico",
            "text": "Durante un'esplorazione notturna, Alberto Angela s'imbatte in un'astronave aliena atterrata a Roma. Gli extraterrestri cercano aiuto contro un'orda di gatti robotici. Angela li aiuta e in cambio gli alieni gli regalano un'astronave.",
        } 

            Assicurati che le chiavi del JSON siano "title" e text", con virgolette.`
    }

    //crea storia
    createStory(prompt)
})

//Al click sul bottone avanti
continueButton.addEventListener('click', function () {
    // preparo nuovo prompt
    const prompt = {
        role: 'user',
        content: 'Continua la storia da qui. Scrivi un breve paragrafo che prosegua la storia precedente. Le tue risposte sono solo in formato JSON con lo stesso formato delle tue risposte precedenti. Mantieni lo stesso valore per "title". Cambia solo il valore di "text"'
    }

    //crea storia
    createStory(prompt)
})

//al click sul bottone home
homeButton.addEventListener('click', function () {
    //ricarica la pagina
    window.location.reload()
})