Applicazione che crea storie tramite l'API di AI di openAI inserendo un nome, 3 emoji e segue il prompt:

`Crea una storia a partire da queste emoji: ${selectedEmojis}. Il protagonista della storia si chiama ${name}. La storia deve essere breve e avere un titolo, anche questo molto breve. Le tue risposte sono solo in formato JSON come questo esempio:

        {
            "title": "Incontro intergalattico",
            "text": "Durante un'esplorazione notturna, Alberto Angela s'imbatte in un'astronave aliena atterrata a Roma. Gli extraterrestri cercano aiuto contro un'orda di gatti robotici. Angela li aiuta e in cambio gli alieni gli regalano un'astronave.",
        } 

            Assicurati che le chiavi del JSON siano "title" e text", con virgolette.`
