'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Music, ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      category: "General Interest",
      questions: [
        {
          question: "Are more people learning Irish?",
          answer: (
            <>
              <p className="mb-3">Aye, dead on. The teanga's having a wee moment. IBEC dropped a report in July 2024 saying there's been a 71% spike in folk who can speak Irish since 1991—Gaelscoileanna are popping up, teaching's actually getting better, and apps like Duolingo mean ye don't need to wait for yer granny to teach ye anymore.</p>
              <p>During the lockdown sesh (2020–2021), Irish became the fastest-growing course on Duolingo. About 1.1 million users were actively at it in 2021. Ireland.ie reckons pop-up Gaeltachts, social media, and—let's be honest—<em>us</em> and other Irish-language music have a wee bit to do with it. Turns out people want to use Irish for sex, drugs, Buckfast and craic, not just Mass and poetry nobody reads.</p>
            </>
          )
        },
        {
          question: "Are more people learning Irish on Duolingo? How many learners are there?",
          answer: (
            <>
              <p className="mb-3">Duolingo's still the big yoke for Irish. Irish Central says there's about 950,000 active users on the Irish course as of August 2025, and they reckon 34 hours on the app equals a university semester. IBEC goes even bigger—over a million active learners, five million who've had a go.</p>
              <p>Sound for starting out, but here's the thing: some of the grammar's dodgy, and the AI voices'll confuse ye if ye don't have a foundation first. The Geeky Gaeilgeoir blog straight-up says don't rely on it solo. Get a proper course alongside it, or you'll end up sounding like a robot from Ranelagh.</p>
            </>
          )
        },
        {
          question: "How many people are learning Irish (total)?",
          answer: (
            <>
              <p className="mb-3">If ye add up the school kids, the adults having a second go, and the app heads worldwide, ye're looking at over five million people who've started learning Irish through Duolingo alone. In the North, Irish is offered in 41.9% of post-primary schools now, and GCSE entries jumped 14.9% in 2024.</p>
              <p>That's a lot of folk realising the language isn't just for eejits in tweed—it's for anyone who wants it.</p>
            </>
          )
        },
        {
          question: 'What is "learning" in Irish?',
          answer: (
            <>
              <p className="mb-3">The noun for "learning" is <strong>foghlaim</strong>. If you're feeling academic, there's also <strong>léann</strong>, which means "scholarship or erudition"—basically the fancy version. Ye might say <strong>Tá dearcadh dearfach acu i leith na foghlama</strong> ("They've got a positive attitude to learning").</p>
              <p>Or, in West Belfast: "Yer man's actually putting in the graft."</p>
            </>
          )
        },
        {
          question: "What's the point of learning Irish? Is it useful or a waste of time?",
          answer: (
            <>
              <p className="mb-3"><strong>It connects ye to yer actual roots.</strong> Learning Irish links ye to ancient stories, songs, and proverbs. Even a cúpla focal helps ye understand place-names and how yer ancestors saw the world. <strong>Eo</strong> means "yew tree"—shows up in <strong>Maigh Eo</strong> (Mayo). Now ye know.</p>
              <p className="mb-3"><strong>It's a mental workout.</strong> The language uses VSO order (verb-subject-object), initial mutations, and two verbs for "to be"—it'll make yer brain work in ways English never bothered. Strengthens memory and problem-solving. Plus, it's gas watching folk's heads melt when ye switch mid-sentence.</p>
              <p className="mb-3"><strong>Instant community.</strong> Speaking even a wee bit of Irish creates connection with other Gaeilgeoirí. Pop-up Gaeltachts, podcasts, online communities—these are vibrant circles where ye'll always get a warm welcome. 41% of people are more likely to buy products with Irish branding now, so there's economic value in it too.</p>
              <p className="mb-3"><strong>Future opportunities.</strong> Irish is an official EU language. Jobs in translation, media, education, AI voice tech (like Gaelgoir.ai), and tourism need Irish fluency. Plus, it pisses off the right people, which is always a bonus.</p>
              <p>So nah, learning Irish isn't a waste of time. It's an investment in who ye are and where ye're from.</p>
            </>
          )
        },
        {
          question: "Is learning Irish hard? Is it harder than other languages?",
          answer: (
            <>
              <p className="mb-3">Not as bad as ye think. Irish uses the same Latin alphabet as English and has only 11 irregular verbs. There's no word for "yes" or "no"—ye just repeat the verb, which actually makes conversation more meaningful. Adjectives follow nouns, verbs come first (VSO), but once ye get the hang of it, it's dead logical.</p>
              <p className="mb-3">The "Irish is impossible" shite comes from how it was taught—rote grammar, translation drills, punishments for speaking English in the yard. That's colonial hangover pedagogy. Modern resources (podcasts, songs, AI-powered apps like <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">gaelgoir.ai</a>, and interactive lyric translations on <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a>) make it way more engaging.</p>
              <p>Basically, if ye can learn to roll a joint in the back of a moving bus, ye can learn Irish.</p>
            </>
          )
        }
      ]
    },
    {
      category: "Getting Started",
      questions: [
        {
          question: "Where should I start when learning Irish?",
          answer: (
            <>
              <p className="mb-3"><strong>Pick a dialect and a basic course.</strong> Irish has three main dialects (Connacht, Munster, Ulster). Choose one, but don't stress—basics are shared. Books like <em>Learning Irish</em> by Mícheál Ó Siadhail cover Connemara, while <em>Buntús Cainte</em> uses standard Irish. Both give ye clear explanations, graded exercises, and audio so ye can actually hear it.</p>
              <p className="mb-3"><strong>Get on a proper online course.</strong> Gaelchultúr's Ranganna.com offers professionally developed courses (A1 to C2), conversation classes, and Leaving Cert prep. GaeligeoirGuides.com has part-time courses for adults aiming for a H4 (needed for primary teaching) with live classes and one-to-one support.</p>
              <p className="mb-3"><strong>Incorporate media ye actually want to consume.</strong> Listen to RTÉ Raidió na Gaeltachta, TG4, podcasts like Nuacht Mhall (slow news) and Beo ar Éigean. Use <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a> to sing along with our tunes—helps ye internalise grammar and vocab through music. Turns out learning's easier when it doesn't feel like homework.</p>
              <p className="mb-3"><strong>Practise speaking daily.</strong> AI voicebots like <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a> let ye talk to a fluent conversational partner anytime. Safe environment, instant feedback on pronunciation, no judgment. Pop-up Gaeltachts are also class for practising in person—usually in a pub, which helps.</p>
              <p><strong>Stay motivated.</strong> Remember the proverb: <strong>"Tús maith, leath na hoibre"</strong> ("A good start is half the work"). Short daily practice beats occasional cramming. Little and often, like.</p>
            </>
          )
        },
        {
          question: "How do I learn Irish from scratch or at home?",
          answer: (
            <>
              <p className="mb-3"><strong>Set up a structured routine.</strong> Combine a beginner course (Buntús Cainte or Ranganna.com) with daily practice on Duolingo or other apps. Use Irish-language media for immersion: Cúla4 cartoons, TG4 news, songs on <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a>. AI voicebots like <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a> are perfect for home practice—they simulate natural conversation and adapt to yer level.</p>
              <p className="mb-3"><strong>Practise pronunciation early.</strong> Use Teanglann.ie for recordings in all three dialects. Read and listen simultaneously, note the tricky sounds, practise them daily. Don't skip this or ye'll sound like a Yank trying to order a pint in Temple Bar.</p>
              <p><strong>Keep a vocab journal.</strong> Write down new words and their mutations. Irish changes the beginning of words rather than the end, so pay attention. <a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a> offers personalised vocab lists for Leaving Cert students—ensures ye learn the words most relevant to exam texts. Even if ye're not sitting exams, it's a sound system.</p>
            </>
          )
        },
        {
          question: "How do I learn Irish from English? Is it different for English speakers?",
          answer: (
            <>
              <p className="mb-3">Irish grammar's different from English. Verb comes first (VSO order), adjectives follow nouns, and there are two forms of "to be." Irish lacks "yes" or "no"—ye answer by repeating the verb (e.g., <strong>An bhfuil tú ag dul? Tá</strong> – "Are you going? I am"). Knowing these differences helps ye avoid translating literally, which'll make ye sound like a bot.</p>
              <p className="mb-3">For English speakers, the 11 irregular verbs (<strong>bí, déan, téigh, beir, dún, fág, faigh, feic, clois, ith, tabhair</strong>) are the most important to master. <em>Collins Easy Learning Irish Verbs</em> gives conjugations for 115 verbs with notes on tenses and dialects—dead handy.</p>
              <p>Also, loads of Hiberno-English expressions come directly from Irish. Ye say "I have Irish" instead of "I speak Irish" and "I'm after doing it" to mean "I just did it." Understanding these structures helps ye learn Irish <em>and</em> improves yer Hiberno-English, which is class.</p>
            </>
          )
        }
      ]
    },
    {
      category: "Audience-Specific",
      questions: [
        {
          question: "How to learn Irish as an adult?",
          answer: (
            <>
              <p className="mb-3"><strong>Take adult-focused courses.</strong> Gaelchultúr offers evening classes for adults in Dublin, online, and in the USA/Canada time zone. Conradh na Gaeilge in Dublin runs courses for beginners to advanced learners year-round. Oideas Gael in Donegal and Cultúrlann Uí Chanáin in Derry provide immersion programmes and conversation classes.</p>
              <p className="mb-3"><strong>Practice socially.</strong> Attend Pop-Up Gaeltacht events—learners meet casually in pubs to chat over a pint. It's low-pressure and ye meet sound folk. AI voicebots like <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a> are ideal for adults who feel shy; ye can practise conversational Irish at yer own pace without anyone judging yer mistakes.</p>
              <p><strong>Use supportive tools.</strong> <a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a> isn't just for students—adults can join to get personalised study plans and track progress with AI analytics. It's like having a tutor who doesn't charge by the hour.</p>
            </>
          )
        },
        {
          question: "How do beginners and children learn Irish?",
          answer: (
            <>
              <p className="mb-3"><strong>Children's resources:</strong> Gaelbhratach's "Is Féidir Linn" site offers daily phrases with recordings for families. Easy Irish provides free podcasts and games. Duolingo uses game-like lessons and 5-minute practice sessions, perfect for wee ones with short attention spans. Cúla4 (TG4's kids' site) has cartoons, games, and simple learning apps.</p>
              <p className="mb-3"><strong>Apps:</strong> Duolingo and Cúla4 are widely used. For kids who like music, <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a> lets them learn Irish through our rebellious hip-hop—lyrics are translated and colour-coded to highlight grammar. They'll pick up slang and real-world phrases, not just "An bhfuil cead agam dul go dtí an leithreas?" on repeat.</p>
              <p><strong>Support for dyslexia:</strong> Dyslexia Ireland recommends structured phonics-based teaching because Irish is more regular than English. Irish uses consistent spelling patterns, so learners with dyslexia often find it easier once taught systematically. Teachers should use phonics resources like seideansi.ie and maradearfa.ie. AI tools like <a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a> can adapt to individual learning needs, while <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a> provides multi-sensory, spoken practice.</p>
            </>
          )
        },
        {
          question: "How to learn Irish for primary teaching?",
          answer: (
            <>
              <p className="mb-3"><strong>Qualifications:</strong> To enter primary-teaching programmes in Ireland ye usually need at least a H4 in Leaving Cert Irish. Gaeilgeoir Guides offers a one-year part-time course designed to bring adult learners to H4 level, including live classes, notes, and one-to-one support. <a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a> provides personalised study plans and exam-style questions for Leaving Cert learners.</p>
              <p><strong>Teaching Irish to kids:</strong> Use stories, songs, and games. Resources like Cúla4, Easy Irish, and <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a> keep children engaged. Encourage speaking at home: label household objects in Irish and practise simple phrases during routine tasks. Make it fun, not a chore, or they'll end up hating it like everyone who went through the old system.</p>
            </>
          )
        }
      ]
    },
    {
      category: "Online Resources",
      questions: [
        {
          question: "How to learn Irish online? Where can I learn Irish online for free?",
          answer: (
            <>
              <p className="mb-3"><strong>Free courses:</strong></p>
              <ul className="list-disc list-inside mb-3 space-y-1">
                <li>FutureLearn's "Irish 101" from Dublin City University—free intro to Irish history, culture, and basics.</li>
                <li>The Philo-Celtic Society provides free online Irish classes.</li>
                <li>Trinity College Dublin's Irish Language Office collaborates with Gaelchultúr for free lunchtime classes for students and staff.</li>
                <li>Cultúrlann Uí Chanáin in Derry runs affordable 30-week courses (£180/£130 concession) with beginner, intermediate, and advanced levels, including online classes.</li>
                <li>Pop-Up Gaeltacht events are free social gatherings—turn up, have a pint, speak Irish.</li>
              </ul>
              <p className="mb-2"><strong>Other websites:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ranganna.com (Gaelchultúr)—structured courses and short modules; some units are free.</li>
                <li>Duolingo (free app)—good for vocab and gamified practice; supplement with other resources.</li>
                <li>Focloir.ie and Focal.ie—free online dictionaries.</li>
                <li>Gramadach na Gaeilge—free grammar explanations and verb tables.</li>
                <li>Forvo and Abair.ie—pronunciation dictionaries.</li>
                <li><a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a>—primarily a paid platform, but offers free sample lessons and AI-generated vocab lists; teachers get workload-saving tools.</li>
              </ul>
            </>
          )
        },
        {
          question: "What's the best app for learning Irish? Is there a good app for kids?",
          answer: (
            <>
              <p className="mb-3"><strong>Duolingo</strong> remains the most popular for both adults and children. Bite-sized lessons, immediate feedback, gamified practice. But supplement it with other sources because its AI voices aren't always accurate. Great for maintaining streaks though—keeps ye coming back.</p>
              <p className="mb-3"><strong>Teanglann</strong> is invaluable for pronunciation—offers audio in all three dialects. Use it to check how words actually sound, not how ye think they sound.</p>
              <p className="mb-3"><strong><a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a></strong> is an AI-powered voicebot that speaks Irish. Ideal for practising conversation and improving listening skills. The voicebot tailors responses to yer level and provides hints when ye get stuck. It's like having a patient mate who'll correct yer pronunciation without making ye feel like an eejit.</p>
              <p className="mb-3"><strong><a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">TheKneecapp.ie</a></strong> is a fun app/site for younger learners (and anyone, really)—translates all our songs into English and offers interactive lyric learning. Kids learn slang and real-world phrases used in modern Hiberno-Irish hip-hop. Way better than learning from a textbook written in 1974.</p>
              <p><strong>Cúla4</strong> (TG4's app) offers games and cartoons for children. Sound for wee ones.</p>
            </>
          )
        },
        {
          question: "Is Duolingo good for learning Irish? How to use it effectively?",
          answer: (
            <>
              <p className="mb-3"><strong>Pros:</strong> Motivates learners with streaks, gamification, and a large community. Duolingo's Irish course has multiple checkpoints, tips, and stories. It's free and ye can do it on yer phone. Studies suggest 34 hours of Duolingo can equate to a semester of college language study.</p>
              <p className="mb-3"><strong>Cons:</strong> Some grammatical explanations and audio recordings contain errors; voices are AI-generated and sometimes dodgy. Pronunciation may not reflect the dialect ye want to learn. Ye might end up sounding like a confused algorithm.</p>
              <p className="mb-2"><strong>Tips:</strong> Use Duolingo for vocab and basic sentence patterns, but supplement it with:</p>
              <ul className="list-disc list-inside mb-3 space-y-1">
                <li>A structured course (Ranganna.com or Buntús Cainte).</li>
                <li>Authentic listening via <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a> songs, RTÉ podcasts, and <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a>.</li>
                <li>Speaking practice through conversation circles or voicebots.</li>
              </ul>
              <p>Basically, don't rely on it alone or ye'll be grand at reading but shite at actually talking.</p>
            </>
          )
        }
      ]
    },
    {
      category: "Books & Resources",
      questions: [
        {
          question: "What's the best book for learning Irish? Are there good books for kids?",
          answer: (
            <>
              <ul className="list-disc list-inside mb-3 space-y-2">
                <li><strong>Learning Irish by Mícheál Ó Siadhail</strong> – The standard intro text. Covers grammar thoroughly, includes online audio. Uses phonetic spelling to aid pronunciation, has graded exercises. Solid foundation.</li>
                <li><strong>Buntús Cainte</strong> – Three-volume series with short, everyday dialogues and audio. Ideal for beginners who want practical stuff.</li>
                <li><strong>Collins Easy Learning Irish Grammar/Verbs</strong> – Clear explanations, fully conjugated verbs with dialect notes. Dead handy reference.</li>
                <li><strong>Turas Teanga</strong> – Intermediate course with book and CDs, recommended for a refresher if ye did Irish in school but forgot most of it.</li>
                <li><strong>Speak Irish Now</strong> – Contains 200+ short lessons with phonetic spellings and a YouTube channel. Good for self-study.</li>
              </ul>
              <p><strong>Kids' books:</strong> Ríra picture books, <em>Mo Chuid Amhrán</em> (songbook), and bilingual storybooks from Futa Fata. Combine these with <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a> to make learning fun. Kids respond better when it doesn't feel like being force-fed vegetables.</p>
            </>
          )
        },
        {
          question: "What are the best Irish learning resources?",
          answer: (
            <>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Comprehensive courses:</strong> Ranganna.com, Buntús Cainte, Learning Irish.</li>
                <li><strong>Exam prep:</strong> Gaeilgeoir Guides, <a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a>.</li>
                <li><strong>Apps:</strong> Duolingo, Teanglann, <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a>.</li>
                <li><strong>Websites:</strong> Focloir.ie, Focal.ie, Gramadach na Gaeilge, Forvo & Abair.ie.</li>
                <li><strong>Podcasts:</strong> Nuacht Mhall, Beo ar Éigean, Bitesize Irish Podcast, How To Gael.</li>
                <li><strong>Videos:</strong> YouTube channels like Gaeilge i mo Chroí, Learn Irish (Dane), BLOC TG4, Tuairisc.</li>
                <li><strong>Music & Culture:</strong> <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">TheKneecapp.ie</a>, pop-up Gaeltachts, Oireachtas na Gaeilge festival, All-Ireland Fleadh.</li>
                <li><strong>Pronunciation & dialect:</strong> Teanglann.ie (recordings); pick a dialect early and stick to it.</li>
                <li><strong>Community:</strong> Pop-Up Gaeltacht, Gaeilge Amháin Facebook group, Twitter Irish word-of-the-day accounts.</li>
                <li><strong>AI tools:</strong> <a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a> uses AI to tailor study plans and lighten teachers' workload. <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a> offers a conversational voicebot. <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">TheKneecapp.ie</a> uses interactive AI translation to make learning through songs accessible and engaging.</li>
              </ul>
            </>
          )
        }
      ]
    },
    {
      category: "Grammar & Pronunciation",
      questions: [
        {
          question: "How do I learn Irish grammar? Where can I get an easy grammar guide or PDF?",
          answer: (
            <>
              <p className="mb-3"><strong>Understand the basics:</strong> Irish uses VSO order (verb–subject–object), adjectives follow nouns, and nouns have grammatical gender. There are no words for "yes" or "no"—the verb is repeated. Initial consonant mutations (lenition and eclipsis) are triggered by grammatical context. Learn the 11 irregular verbs and practise their conjugations using <em>Collins Easy Learning Irish Verbs</em>.</p>
              <p className="mb-2"><strong>Resources:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Gramadach na Gaeilge—free grammar explanations and verb tables.</li>
                <li>Collins Easy Learning Irish Grammar—clear grammar rules and examples.</li>
                <li>Buntús Cainte and Learning Irish—provide grammar in context, which is easier to absorb than dry tables.</li>
                <li><a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a>—generates personalised grammar exercises and automatically marks them. Like having a teacher who doesn't sleep.</li>
              </ul>
            </>
          )
        },
        {
          question: "How do I learn Irish pronunciation?",
          answer: (
            <>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Listen & repeat:</strong> Use Teanglann.ie to hear native speakers from Connacht, Munster, and Ulster dialects. Don't just read—<em>hear</em> it.</li>
                <li><strong>Read while listening:</strong> Bitesize Irish suggests reading along with audio, noting difficult sounds and practising them daily. Repetition's key; ye won't nail it first time.</li>
                <li><strong>Choose one dialect:</strong> Each dialect has unique vowel and consonant sounds. Focusing on one prevents confusion. Pick the one that sounds best to ye.</li>
                <li><strong>AI practice:</strong> Speak to <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a>—the voicebot can correct yer pronunciation in real time and adapt to yer accent. No judgment, just feedback.</li>
                <li><strong>Music:</strong> Sing along with our tunes on <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a>. Music helps internalise pronunciation patterns. Plus, it's gas.</li>
              </ul>
            </>
          )
        },
        {
          question: "What are useful Irish verbs to learn first?",
          answer: (
            <>
              <p className="mb-3">These verbs are essential and often irregular: <strong>bí</strong> (to be), <strong>déan</strong> (do/make), <strong>téigh</strong> (go), <strong>beir</strong> (catch/bear), <strong>dún</strong> (close), <strong>fág</strong> (leave), <strong>faigh</strong> (get), <strong>feic</strong> (see), <strong>clois/cluin</strong> (hear), <strong>ith</strong> (eat), <strong>ól</strong> (drink), <strong>cuir</strong> (put), <strong>abair</strong> (say), <strong>éist</strong> (listen), <strong>mol</strong> (praise).</p>
              <p>Learn their present, past, and future forms. Practise them in sentences, not just conjugation tables. Ye need to <em>use</em> them, not just memorise them.</p>
            </>
          )
        },
        {
          question: 'Is "Collins Easy Learning Irish Verbs" good?',
          answer: (
            <p>Aye, it's sound. The book contains 115 fully conjugated verbs, clear explanations of tenses and moods, notes on dialect variations, and an alphabetical index. Suitable for beginners at school, work, or home. Complements the Easy Learning Irish Grammar book. Between the two, ye've got a solid foundation.</p>
          )
        }
      ]
    },
    {
      category: "Speaking & Accents",
      questions: [
        {
          question: "How can I learn an Irish accent? Is there an app?",
          answer: (
            <>
              <p className="mb-3">There's no single Irish accent—there are loads of regional varieties. Hiberno-English reflects the grammar and rhythms of Irish. Folk often say "I'm after doing it" (recent past) or "I have Irish" (I speak Irish). Pronunciation features include replacing "th" with "t/d," saying "fill-um" for "film," softening final consonants (right → "rye"), and adding "ch" or "j" to t/d (tube → "choob"). People also use phrases like "Story?" to mean "What's happening?"</p>
              <p className="mb-2"><strong>To learn the accent:</strong></p>
              <ul className="list-disc list-inside mb-3 space-y-1">
                <li><strong>Listen extensively:</strong> Watch TG4 programmes, Irish films, or our documentary. Mimic the speakers.</li>
                <li><strong>Practise with a coach:</strong> Actors often work with dialect coaches or use YouTube tutorials.</li>
                <li><strong>Use AI voicebots:</strong> <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a> can adjust to Hiberno-English accent and help ye practise intonation.</li>
              </ul>
              <p>While there are accent training apps, they're mostly geared toward general English. For a Hiberno-English accent, the best tool is exposure and practice. And spending time in West Belfast, obviously.</p>
            </>
          )
        },
        {
          question: "How can I practise speaking and pronunciation?",
          answer: (
            <>
              <p className="mb-3"><strong>Conversation circles & Pop-Up Gaeltacht:</strong> Join weekly conversation sessions at universities or monthly Pop-Up Gaeltachts. These informal settings help ye gain confidence. Plus, there's usually pints involved.</p>
              <p className="mb-3"><strong><a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a>:</strong> The AI voicebot can converse with ye 24/7. It adapts to yer level, corrects pronunciation, and provides vocab hints. Because it's a robot, ye can practise without fear of judgment. Make all the mistakes ye want.</p>
              <p className="mb-3"><strong>Song practice:</strong> Singing along with <a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">thekneecapp.ie</a> improves fluency and rhythm. This site provides translations for every one of our songs and highlights Irish grammar and slang. Ye'll learn real-life expressions and dialectal pronunciation, not textbook Irish from 1950.</p>
              <p><strong>Record yourself:</strong> Use yer phone to record yer speech and compare it with native speakers (Teanglann or Forvo). Over time yer pronunciation will become more authentic. Ye might cringe at first, but that's part of the process.</p>
            </>
          )
        },
        {
          question: "What are useful Irish words and phrases to start with?",
          answer: (
            <>
              <ul className="list-disc list-inside mb-3 space-y-2">
                <li><strong>Greetings:</strong> Dia dhuit (hello), Conas atá tú? (how are you?), Slán (goodbye).</li>
                <li><strong>Courtesy:</strong> Le do thoil (please), Go raibh maith agat (thanks), Tá fáilte romhat (you're welcome).</li>
                <li><strong>Basic verbs:</strong> Tá mé (I am), Tá mé ag foghlaim (I'm learning), Is maith liom Kneecap (I like Kneecap).</li>
                <li><strong>Everyday phrases:</strong> Céard atá ar siúl agat? (What are you up to?), An bhfuil tú ag éisteacht le Kneecap? (Are you listening to Kneecap?), Tá an A.I. seo ag cabhrú liom (This AI is helping me).</li>
                <li><strong>Proverbs:</strong> <strong>Is fearr Gaeilge briste ná Béarla cliste</strong> – "Broken Irish is better than clever English". Never be afraid to speak! Even if ye sound like shite, at least ye're trying.</li>
              </ul>
              <p><strong>Own your dialect:</strong> Find artists/speakers ye like and mirror them, then practise the same lines inside <a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir AI</a> until yer muscle memory catches up.</p>
            </>
          )
        }
      ]
    },
    {
      category: "AI & The Future",
      questions: [
        {
          question: "How is AI helping people learn Irish?",
          answer: (
            <>
              <p className="mb-3">The Irish language is having a renaissance. AI's playing a pivotal role now:</p>
              <p className="mb-3"><strong><a href="https://examinaite.ie" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:text-orange-600 underline">Examinaite.ie</a></strong> uses AI to personalise study plans for Leaving Cert students. Analyses strengths and weaknesses, recommends targeted exercises, reduces teacher workload. For busy teachers and students, it's like having a personal tutor in yer pocket who doesn't charge 50 quid an hour.</p>
              <p className="mb-3"><strong><a href="https://thekneecapp.ie" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">TheKneecapp.ie</a></strong> blends AI with culture—translates our lyrics word-by-word, highlights idioms and slang, offers interactive quizzes. Learning through music keeps learners engaged and introduces contemporary vocab that textbooks ignore. We're talking about drugs, nightlife, and real life—not "Tá mo mháthair sa chistin" for the hundredth time.</p>
              <p className="mb-3"><strong><a href="https://gaelgoir.ai" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700 underline">Gaelgoir.ai</a></strong> is one of the first voicebots to speak Irish. Simulates conversation, corrects pronunciation, adapts to yer dialect. With voice recognition and natural-language understanding, it makes speaking practice accessible anywhere, anytime. This kind of AI tech is the future of language learning—responsive, personalised, and always there when ye need it.</p>
              <p className="mb-3">Together, these tools ensure learners at home, in school, or abroad can access high-quality Irish-language education. Whether ye want to ace the Leaving Cert, chat in the Gaeltacht, sing along to our tunes, or simply connect with yer heritage, now's a great time to start.</p>
              <p>Remember: <strong>"Tús maith, leath na hoibre"</strong> – a good start is half the work. With AI-powered resources and a growing community, the rest of the journey is both manageable and enjoyable. Plus, ye get to piss off colonisers, which is always a bonus.</p>
            </>
          )
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Music className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold">
                <span className="text-green-600">The</span>
                <span className="text-gray-900 dark:text-white">Kneec</span>
                <span className="text-orange-500">App</span>
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Educational Platform</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                Home
              </Link>
              <Link href="/songs" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                Songs
              </Link>
              <Link href="/learn" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                Learn Irish
              </Link>
              <Link href="/faq" className="text-green-600 font-semibold">
                FAQ
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about learning Irish through TheKneecApp
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-green-600">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = categoryIndex * 100 + questionIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={questionIndex}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {item.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Music className="h-6 w-6 text-green-400" />
            <span className="text-xl font-bold">
              <span className="text-green-400">The</span>
              <span className="text-white">Kneec</span>
              <span className="text-orange-400">App</span>
              <span className="text-white"> Educational Platform</span>
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Educational platform for learning Irish through KNEECAP's bilingual rap music
          </p>
          <p className="text-sm text-gray-500">
            This is an educational resource. All rights to the music and lyrics belong to KNEECAP.
          </p>
        </div>
      </footer>
    </div>
  );
}

