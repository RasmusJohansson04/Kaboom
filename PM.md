# [RED LEAD](https://red-lead.netlify.app/)

PM

20/12-2022

Rasmus Johansson

# Inledning

Syftet med detta arbete var att fördjupa oss i JavaScript genom att få testa på att skapa ett spel med en JavaScript spelmotor. Jag valde att göra mitt spel i Kaboom.js efter att jag försökt använda Phaser 3.

# Bakgrund

Detta arbete började med avsikten att skapa ett spel med hjälp av Phaser 3 spelmotorn. Den första idéen var att skapa ett simpelt sorts management spel där syftet var att samla resurser och uppgradera maskiner. Problem uppstod dock ganska tidigt då det var svårt att förstå hur Phaser fungerade och stor del av början på projektet spenderades på att kolla igenom tutorials. [Phasers exempel spel](https://phaser.io/examples/v3) användes fungerade bra på att visa hur man kan implementera olika funktioner, problemet var däremot att dom flesta inte riktigt förklarade varför vissa saker fungerade som dom gjorde och att flera av exemplena endast fungerade i Phaser 2. Jag började sedan jobba på en enkel rougelike. Jag hade tänkt att den skulle använda sig av Random Walk metoden för att generera slumpmässiga banor och detta fungerade ganska bra och det var relativt enkelt att implementera. Med hjälp av [denna tutorial](https://www.codecaptain.io/blog/game-development/shooting-bullets-phaser-3-using-arcade-physics-groups/696) fick jag lära mig hur jag kan skapa projektiler och på så sätt hur man kan hantera nya kopior av spelobjekt. Tutorialen fungerade rätt så bra i att förklara hur saker fungerade och ledde till en bra slut produkt. Jag försökte sedan använda samma metod för att placera ut 'collectibles' på slumpmässiga positioner men lyckades tyvärr inte. Efter detta valde jag att byta till Kaboom.js istället då det kändes enklare att använda och förstå. Jag använde mig av deras dokumentation och några av de exemplen de gav på deras [Playground](https://kaboomjs.com/play?demo=shooter). Exemplena liksom Phasers fungerade bra till att visa hur man kan implementera olika saker men saknade ofta förklaring till varför. Däremot var Kaboom.js mycket enklare att förstå och hade oftast en mycket vänligare och kortare syntax. Phaser kändes onödigt svårt då mycket man kunde göra i Phaser gick att göra i Kaboom.js på enklare sätt. Att skapa projektiler och liknande till exempel var mycket lättare att göra i Kaboom.js och koden var skriven på ett sådant sätt att det gick att förstå hur man skulle kunna modifiera eller utveckla exemplet. Efter att jag kollat på några Kaboom.js exempel började jag jobba på ett spel som till en början skulle vara inspirerat av 'Punch Out' på 'NES' men det skulle utspela sig i en 'vilda västern' liknande revolver duel. Jag började med att först implementera spelarens kontroller och skjut funktionerna. Sedan skapade jag en fiende som kunde ta skada. Jag la till en enkel metod på hur fienden ska bete sig och hur den ska försöka undvika skott medans den ska försöka träffa spelaren. Jag gjorde även några enkla sprites under detta. Till slut var det bara att lägga till en enkel 'title screen' och de flesta viktiga spel mekanikerna var färdiga. 

# Positiva Erfarenheter

Att jobba med Kaboom.js var en mycket positiv erfarenhet då det var väldigt enkelt att förstå hur det fungerade. Det hade en kort och förståelig syntax och krävde inte alls mycket för komma igång. Exempel spelen som fanns på deras hemsida var användbara och visade hur man kunde komma igång med vissa spel. När jag väl börjat arbeta i Kaboom.js gick det ganska snabbt att få igång de mesta.  

Att implementera Random Walk metoden i Phaser gick väldigt bra.

# Negativa Erfarenheter

Att jobba med Phaser 3 kändes onödigt komplicerat. Spelmotorn präglades av lång syntax och koden i sig var svår att förstå.
Många tutorials som hade varit användbara var även föråldrade och endast gjorda för Phaser 2. Problemet var även att det var svårt att kombinera och använda vissa tutorials och exempel då dom ofta skrivs på olika sätt vilket gör att dom har svårt att samarbeta.

Kaboom.js saknade ibland användbara felmeddelanden och visade inte riktigt vars i koden det gick fel. 

# Sammanfattning

Det här projektet gick ganska bra. Det hade en ganska långsam början då jag försökta lära mig Phaser men när jag väl valde att prova på Kaboom.js gick det mycket snabbare och det känndes som att det blev mycket enklare att koda och förstå. Det finns en del saker jag skulle vilja implementera men som jag tyvärr saknade tid för. Till exempel ville jag skapa en bättre 'title screen' och en fiende som reagerar bättre och inte bara tömmer sitt magasin på ingenting. Jag skulle även vilja förbättra spritsen lite gran och lägga till en bättre bakgrund då dom jag använder just nu var först tänkt att bara vara temporära.

# Validering

JS koden validerades enligt [JSValidate](https://codebeautify.org/jsvalidate#) och de flesta problemen kom från att jag inte använde semikolon.