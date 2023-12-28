var exp = (function() {


    var p = {};

    drawSignal = Math.floor(Math.random() * 2);
    drawGameType = Math.floor(Math.random() * 2);

    const settings = {
        responseKeys: ['e', 'i'],
        gameType: ['streak', 'bern'][drawGameType],
        signal: [[10, 50], [50, 10]][drawSignal],
        harderOrEasier: ['less', 'more'][drawSignal],
        moreOrLess: ['more', 'less'][drawSignal],
        practiceSignal: 50,
        nTestTrials: 30,
        nPracticeTrials: 5,
        noise: 10,
        nDots: 100,
        nRounds: 5,
        breakLength: 10,
        bonusAmount: 2,
    };

    console.log(settings.gameType, settings.signal);

    jsPsych.data.addProperties({
        gameType: settings.gameType,
        signal_1: settings.signal[0],
        signal_2: settings.signal[1],
        noise: settings.noise,
        nDots: settings.nDots,
    });


   /*
    *
    *   INSTRUCTIONS
    *
    */

    const pages = {
        prePractice: [
            `<div class='parent'>
                <p>Welcome to Dot Detective!</p>
                <p>In Dot Detective, you'll see a series of grids. Each grid will contain <span style="color: red">red</span> dots and <span style="color: blue">blue</span> dots. The number of dots will change over time.</p>
                <p>Sometimes, the average number of <span style="color: red">red</span> dots will be greater than the average number of <span style="color: blue">blue</span> dots.</p>
                <p>Other times, the average number of <span style="color: blue">blue</span> dots will be greater than the average number of <span style="color: red">red</span> dots.</p>
                <p><strong>Your job is to detect whether there are more <span style="color: red">red dots</span> or <span style="color: blue">blue dots</span> on average.</strong></p>
            </div>`,

            `<div class='parent'>
                <p>It can be difficult to detect whether there are more <span style="color: red">red dots</span> or <span style="color: blue">blue dots</span>.</p>

                <p><strong>No matter how difficult it seems, there is always a correct answer!</strong></p>

                <p>Even if the number of <span style="color: red">red dots</span> or <span style="color: blue">blue dots</span>
                appears very similar, one of the colors is more numerous on average.</p>
            </div>`,

            `<div class='parent'>
                <p>If you respond correctly, you'll see this message:</p>
                <div class="feedback-container-inst">
                    <div class="win-text-inst">Correct!</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>If you respond incorrectly, you'll see this message:</p>
                <div class="feedback-container-inst">
                    <div class="loss-text-inst">Miss!</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>To get a feel for Dot Detective, you'll complete a series of practice rounds.</p>
                <p>Continue when you're ready to practice.</p>
            </div>`],

        postPractice: [
            `<div class='parent'>
                <p>Good job!</p>
                <p>During Dot Detective, you'll only have <b>1 second</b> to respond. 
                Therefore, you'll need to detect whether there are more <span style="color: red">red dots</span> or <span style="color: blue">blue dots</span> <b>as fast as possible</b>!</p>
                <p>To get a feel for playing Dot Detective under time pressure, you'll complete another set of practice rounds. This time, you'll have just 1 second to respond.</p>
                <p>Continue when you're ready to practice responding under time pressure.</p>
            </div>`],

        howToEarn_bern: [
            `<div class='parent'>
                <p>Practice is now complete.</p>
                <p>During Dot Detective, you'll be competing for a chance to win a <b>$100.00 bonus prize</b>.</p>
                <p>Specifically, you'll earn tokens. The tokens you earn will be entered into a lottery, and if one of your tokens is drawn, you'll win $100.00. To maximize your chances of winning a $100.00 bonus, you'll need to earn as many tokens as possible.</p>
                <p>Continue to learn how to earn tokens!</p>
            </div>`,

            `<div class='parent'>
                <p>In Dot Detective, players earn 10 tokens for every correct answer.</p>
                <p>Players earn 0 tokens for every incorrect answer.</p>
            </div>`,

            `<div class='parent'>
                <p>If you respond correctly, you'll see this message indicating that you earned 10 tokens.</p> 
                <div class="feedback-container-inst">
                    <div class="win-text-inst">+10 Tokens</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>If you respond incorrectly, you'll see this message indicating that you earned 0 tokens.</p> 
                <div class="feedback-container-inst">
                    <div class="loss-text-inst">+0 Tokens</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>In addition to earning tokens through your performance, you can gain or lose tokens randomly.
                Specifically, at the end of each round, you have a 20% chance of winning 5 extra tokens, and a 20% chance of losing 5 tokens.</p>
            </div>`,

            `<div class='parent'>
                <p>If you see "+5 Bonus," this means you randomly won 5 extra tokens. For example, this is what you'd see if you randomly won 5 extra tokens after a correct response:</p>
                <div class="feedback-container-inst">
                    <div class="win-text-inst">+10 Tokens</div>
                    <div class="plus-text-inst">+5 Bonus</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>This is what you'd see if you randomly won 5 extra tokens after an incorrect response:</p>
                <div class="feedback-container-inst">
                    <div class="loss-text-inst">+0 Tokens</div>
                    <div class="plus-text-inst">+5 Bonus</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>If you see "-5 Loss," this means you randomly lost 5 tokens. For example, this is what you'd see if you randomly lost 5 tokens after a correct response:</p>
                <div class="feedback-container-inst">
                    <div class="win-text-inst">+10 Tokens</div>
                    <div class="minus-text-inst">-5 Loss</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>This is what you'd see if you randomly lost 5 tokens after an incorrect response:</p>
                <div class="feedback-container-inst">
                    <div class="loss-text-inst">+0 Tokens</div>
                    <div class="minus-text-inst">-5 Loss</div>
                </div>
            </div>`],

        howToEarn_streak: [
            `<div class='parent'>
                <p>Practice is now complete.</p>
                <p>Next, you'll play Dot Detective. During Dot Detective, you'll be competing for a chance to win a <b>$100.00 bonus prize</b>.</p>
                <p>Specifically, you'll earn tokens. The tokens you earn will be entered into a lottery, and if one of your tokens is drawn, you'll win $100.00. To maximize your chances of winning a $100.00 bonus, you'll need to earn as many tokens as possible.</p>
                <p>Continue to learn how to earn tokens!</p>
            </div>`,

            `<div class='parent'>
                <p>In Dot Detective, players earn tokens for streaks of correct responses.</p>
                <p>Specifically, you'll earn 10 tokens for every correct response you make in a row.</p>
                <p>For example, a streak of 2 consecutive correct responses is worth 20 tokens, 
                a streak of 3 consecutive correct responses is worth 30 tokens, and so on.</p>
            </div>`,

            `<div class='parent'>
                <p>After each correct response, you'll see the length of your current streak. For example, after three correct responses in a row, you'd see the following:
                <div class="feedback-container-inst">
                    <div class="streak-text-inst"><p>Current Streak:</p><p>3</p></div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>Each time you lose, you'll see how many tokens you earned from your streak.</p> 
            </div>`,

            `<div class='parent'>
                <p>For example, if you lose after achieving a streak of three, you'll see this message indicating that you earned 30 tokens.</p> 
                <div class="feedback-container-inst">
                    <div class="final-streak-text-inst"><p>Final Streak:</p><p>3</p></div>
                    <div class="win-text-inst">+30 Tokens</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>If you lose after failing to start a streak, you'll see this message indicating that you earned 0 tokens.</p> 
                <div class="feedback-container-inst">
                    <div class="final-streak-text-inst"><p>Final Streak:</p><p>0</p></div>
                    <div class="loss-text-inst">+0 Tokens</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>In addition to earning tokens through your performance, you can gain or lose tokens randomly.
                Specifically, at the end of each round, you have a 20% chance of winning 5 extra tokens, and a 20% chance of losing 5 tokens.</p>
            </div>`,

            `<div class='parent'>
                <p>If you see "+5 Bonus," this means you randomly won 5 extra tokens. For example, this is what you'd see if you randomly won 5 extra tokens after a streak of 3:</p>
                <div class="feedback-container-inst">
                    <div class="final-streak-text-inst"><p>Final Streak:</p><p>3</p></div>
                    <div class="win-text-inst">+30 Tokens</div>
                    <div class="plus-text-inst">+5 Bonus</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>This is what you'd see if you randomly won 5 extra tokens after a streak of 0:</p>
                <div class="feedback-container-inst">
                    <div class="final-streak-text-inst"><p>Final Streak:</p><p>0</p></div>
                    <div class="loss-text-inst">+0 Tokens</div>
                    <div class="plus-text-inst">+5 Bonus</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>If you see "-5 Loss," this means you randomly lost 5 tokens. For example, this is what you'd see if you randomly lost 5 tokens after a streak of 3:</p>
                <div class="feedback-container-inst">
                    <div class="final-streak-text-inst"><p>Final Streak:</p><p>3</p></div>
                    <div class="win-text-inst">+30 Tokens</div>
                    <div class="minus-text-inst">-5 Loss</div>
                </div>
            </div>`,

            `<div class='parent'>
                <p>This is what you'd see if you randomly lost 5 tokens after a streak of 0:</p>
                <div class="feedback-container-inst">
                    <div class="final-streak-text-inst"><p>Final Streak:</p><p>0</p></div>
                    <div class="loss-text-inst">+0 Tokens</div>
                    <div class="minus-text-inst">-5 Loss</div>
                </div>
            </div>`],

        preRound_2: [
            `<div class='parent'>
                <p>The first round of Dot Detective is now complete! Next, you'll play the second round of Dot Detective.</p>
                <p>To learn about the second round of Dot Detective, continue to the next screen.</p>
            </div>`,

            `<div class='parent'>
                <p>The second round of Dot Detective is just like the first round, with one exception: it is designed to be ${settings.harderOrEasier} difficult.
                Specifically, most players respond correctly ${settings.moreOrLess} often in the second version compared to the first version.</p>
            </div>`],

        postTask: [
            `<div class='parent'>
                <p>Both rounds of Dot Detective are now complete!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`]
    };

    function MakeAttnChk(round, gameType) {

        const prompt2 = (gameType == "bern") ? "How many tokens will you win after each correct response?" : "If you respond incorrectly after achieving a streak of 5, how many tokens would you win?";
        const prompt3 = (gameType == "bern") ? "How many tokens will you win after each incorrect response?" : "If you respond incorrectly after achieving a streak of 0, how many tokens would you win?";
        const prompt4 = (gameType == "bern") ? "After each response, what are your chances of randomly winning 5 extra tokens?" : "After each streak, what are your chances of randomly winning 5 extra tokens?";
        const prompt5 = (gameType == "bern") ? "After each response, what are your chances of randomly losing 5 tokens?" : "After each streak, what are your chances of randomly losing 5 tokens?";

        const correctAnswers_1 = (gameType == "bern") ? [`Earn as many tokens as possible.`, `10`, `0`, `20%`, `20%`, `I'll only have 1 second to respond.`] : [`Earn as many tokens as possible.`, `50`, `0`, `20%`, `20%`, `I'll only have 1 second to respond.`];

        const attnChk_1 = {
            type: jsPsychSurveyMultiChoice,
            preamble: `<strong>Please answer the following questions about the ${['first', 'second'][round]} round of Dot Detective.</strong>`,
            questions: [
                {
                    prompt: `How can you maximize your chances of earning a $100 bonus?`, 
                    name: `attnChk1`, 
                    options: [`Respond as fast as possible.`, `Earn as many tokens as possible.`],
                },
                {
                    prompt: prompt2, 
                    name: `attnChk2`, 
                    options: [`0`, `10`, `50`],
                },
                {
                    prompt: prompt3, 
                    name: `attnChk3`, 
                    options: [`0`, `10`, `50`],
                },
                {
                    prompt: prompt4, 
                    name: `attnChk4`, 
                    options: [`0%`, `10%`, `20%`],
                },
                {
                    prompt: prompt5, 
                    name: `attnChk5`, 
                    options: [`0%`, `10%`, `20%`],
                },
               {
                    prompt: `Which statement is true?`, 
                    name: `attnChk6`, 
                    options: [`I can take as long to respond as I like.`, `I'll only have 1 second to respond.`],
                },
            ],
            scale_width: 500,
            on_finish: (data) => {
                const totalErrors = dmPsych.getTotalErrors(data, correctAnswers_1);
                data.totalErrors = totalErrors;
            },
        };

        const correctAnswers_2 = (settings.harderOrEasier == "more") ? [`More difficult.`] : [`Less difficult.`];

        const attnChk_2 = {
            type: jsPsychSurveyMultiChoice,
            preamble: `<strong>Please answer the following question about the ${['first', 'second'][round]} round of Dot Detective.</strong>`,
            questions: [
                {
                    prompt: `Is the second round of Dot Detective more or less difficult than the first?`, 
                    name: `attnChk7`, 
                    options: [`More difficult.`, `Less difficult.`],
                },
            ],
            scale_width: 500,
            on_finish: (data) => {
                const totalErrors = dmPsych.getTotalErrors(data, correctAnswers_2);
                data.totalErrors = totalErrors;
            },
        };
      
        const introRound1 = {
            type: jsPsychInstructions,
            pages: [pages.howToEarn_streak, pages.howToEarn_bern][drawGameType],
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const introRound2 = {
            type: jsPsychInstructions,
            pages: pages.preRound_2,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const errorMessage = {
            type: jsPsychInstructions,
            pages: [`<p>You provided the wrong answer.</p><p>Please continue to try again.</p>`],
            show_clickable_nav: true,
        };

        const conditionalNode = {
          timeline: [errorMessage],
          conditional_function: () => {
            const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const instLoop = {
          timeline: [[introRound1, introRound2][round], [attnChk_1, attnChk_2][round], conditionalNode],
          loop_function: () => {
            const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const readyToPlay = {
            type: jsPsychInstructions,
            pages: [`<p>You're now ready to the ${['first', 'second'][round]} round of Dot Detective.</p>
                     <p>To begin, continue to the next screen.</p>`],
            show_clickable_nav: true,
        };
        this.timeline = [instLoop, readyToPlay];
    };

    const prePractice = {
        type: jsPsychInstructions,
        pages: pages.prePractice,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    const postPractice = {
        type: jsPsychInstructions,
        pages: pages.postPractice,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.postTask = {
        type: jsPsychInstructions,
        pages: pages.postTask,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
    
   /*
    *
    *   TASK
    *
    */

    let currentStreak = 0;
    let finalStreak = 0;
    let trialIdx = 0;
        
    // trials

    const MakeProbe = function(round, gameType, timed) {

        const signalArray = (round == "practice") ? [settings.practiceSignal, -settings.practiceSignal] : [settings.signal[round], -settings.signal[round]];
        const blockType = (round == "practice") ? ["practice"] : ["test"];
        const nTrials = (round == "practice") ? settings.nPracticeTrials : settings.nTestTrials;

        const factors = {
            drift: signalArray,
            noise: [settings.noise],
            blockType: blockType,
        };  // factors for making experimental design

        const design = jsPsych.randomization.factorial(factors, nTrials)

        const makeTokenArray = function() {
          return jsPsych.randomization.repeat([0, 1, 2, 2, 2], 1);
        };

        let tokenArray_win = makeTokenArray();
        let tokenArray_loss = makeTokenArray();

        const getReady = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                return (trialIdx == 0 && timed) ? '<span style="font-size:70px">Get Ready!</span>' : '';
            },
            choices: "NO_KEYS",
            trial_duration: function() {
                return (trialIdx == 0 && timed) ? 3000 : 0;
            },
        };

        const probe = {
            type: jsPsychCanvasKeyboardResponse,
            stimulus: function(c) {
                dmPsych.dots(c, jsPsych.timelineVariable('drift'), 1, jsPsych.timelineVariable('noise'), 'normal', settings.responseKeys, settings.nDots);
            },
            canvas_size: [600, 800],
            choices: settings.responseKeys,
            trial_duration: function() {
                return (timed) ? 1000 : null;
            },
            prompt: '<p>On average, are there more <span style="color: red">red</span> dots or <span style="color: blue">blue</span> dots?</p><p>Press <span style="color: red">"e" for red</span> and <span style="color: blue">"i" for blue</span>.</p>',
            data: {round: round, drift: jsPsych.timelineVariable('drift'), blockType: jsPsych.timelineVariable('blockType'), round: round, trialType: "probe"},
            on_finish: function(data){
                if(jsPsych.timelineVariable('drift') > 0) {
                    data.response == "i" ? data.correct = true : data.correct = false;
                } else {
                    data.response == "e" ? data.correct = true : data.correct = false;
                };
                if (data.rt > 60000) { 
                    jsPsych.data.addProperties({boot: true, bootReason: 'inactivity'});
                    jsPsych.endExperiment("The experiment has ended early due to inactivity.");
                }
                if (data.rt == null) {
                    data.tooSlow = true;
                } else {
                    data.tooSlow = false;
                }
                trialIdx++;
                data.trialIdx = trialIdx;
            },
        };

        const feedback = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                if (jsPsych.data.getLastTrialData().values()[0].correct) {
                    return `<div class="feedback-container"> <div class="win-text">Correct!</div></div>`;
                } else {
                    return `<div class="feedback-container"> <div class="loss-text">Miss!</div></div>`;
                };
            },
            choices: "NO_KEYS",
            trial_duration: 1000,
            data: {round: round, drift: jsPsych.timelineVariable('drift'), blockType: jsPsych.timelineVariable('blockType'), trialType: "feedback"},
            on_finish: function(data) {
                if (jsPsych.data.get().last(2).trials[0].correct) {
                    currentStreak++;
                };

                if (!jsPsych.data.get().last(2).trials[0].correct || trialIdx == nTrials * 2) {
                    finalStreak = currentStreak;
                    data.finalStreak = finalStreak;
                    currentStreak = 0;
                };
                data.trialIdx = trialIdx;
            },
        };

        const tokens = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: function() {
                if (gameType == "bern") {
                    if (jsPsych.data.get().last(2).trials[0].correct) {
                        let bonusIdx = tokenArray_win.pop();
                        let bonusText = ['<div class="plus-text">+5 Bonus</div>', '<div class="minus-text">-5 Loss</div>', ''][bonusIdx];
                        return `<div class="feedback-container"> <div class="win-text"> +10 Tokens! </div>${bonusText}</div>`;
                    } else {
                        let bonusIdx = tokenArray_loss.pop();
                        let bonusText = ['<div class="plus-text">+5 Bonus</div>', '<div class="minus-text">-5 Loss</div>', ''][bonusIdx];
                        return `<div class="feedback-container"> <div class="loss-text"> +0 Tokens! </div>${bonusText}</div>`;
                    };                    
                } else {
                    if (currentStreak == 0) {
                        if (finalStreak > 0) {
                            let bonusIdx = tokenArray_win.pop();
                            let bonusText = ['<div class="plus-text">+5 Bonus</div>', '<div class="minus-text">-5 Loss</div>', ''][bonusIdx];
                            return  `<div class="feedback-container"> 
                                <div class="final-streak-text"><p>Final Streak:</p><p>${finalStreak}</p></div>
                                <div class="win-text"> +${finalStreak * 10} Tokens</div>${bonusText}
                                </div>` ;
                        } else {
                            let bonusIdx = tokenArray_loss.pop();
                            let bonusText = ['<div class="plus-text">+5 Bonus</div>', '<div class="minus-text">-5 Loss</div>', ''][bonusIdx];
                            return  `<div class="feedback-container"> 
                                <div class="final-streak-text"><p>Final Streak:</p><p>${finalStreak}</p></div>
                                <div class="loss-text"> +0 Tokens</div>${bonusText}
                                </div>` ;                            
                        }
                    } else {
                        return `<div class="feedback-container"> 
                            <div class="streak-text"><p>Current Streak:</p><p>${currentStreak}</p></div> 
                            </div>`;
                    };
                };
            },
            choices: "NO_KEYS",
            trial_duration: 2000,
            data: {round: round, drift: jsPsych.timelineVariable('drift'), blockType: jsPsych.timelineVariable('blockType'), trialType: "tokens"},
            on_finish: function(data) {
                if (tokenArray_win.length == 0) {
                    tokenArray_win = makeTokenArray();
                };
                if (tokenArray_loss.length == 0) {
                    tokenArray_loss = makeTokenArray();
                };
                data.trialIdx = trialIdx;
            },
        };

        this.timeline = (round == "practice") ? [getReady, probe, feedback] : [getReady, probe, feedback, tokens];
        this.randomize_order = true;
        this.timeline_variables = design;
    };

    // timelines

    const practice_untimed = new MakeProbe("practice", settings.gameType, false);
    const practice_untimed_wrapper = {
        timeline: [practice_untimed],
        on_timeline_start: () => {
            trialIdx = 0;
            finalStreak = 0;
            currentStreak = 0;
        },
    };

    const practice_timed = new MakeProbe("practice", settings.gameType, true);
    const practice_timed_wrapper = {
        timeline: [practice_timed],
        on_timeline_start: () => {
            trialIdx = 0;
            finalStreak = 0;
            currentStreak = 0;
        },
    };

    p.practice = {
        timeline: [prePractice, practice_untimed_wrapper, postPractice, practice_timed_wrapper],
    };

    const block1 = new MakeProbe(0, settings.gameType, true)
    const block1_wrapper = {
        timeline: [block1],
        on_timeline_finish: (trial) => {
            let mdn_rt = jsPsych.data.get().filter({round: 0, trialType: "probe", tooSlow: false}).select('rt').median();
            if (mdn_rt < 300) {
                jsPsych.data.addProperties({boot: true, bootReason: 'tooFast'});
                jsPsych.endExperiment("The experiment has ended early due to overly-fast responding.");
            };
        },
        on_timeline_start: () => {
            trialIdx = 0;
            finalStreak = 0;
            currentStreak = 0;
        },
    };

    const block2 = new MakeProbe(1, settings.gameType, true)
    const block2_wrapper = {
        timeline: [block2],
        on_timeline_finish: () => {
            let mdn_rt = jsPsych.data.get().filter({round: 1, trialType: "probe", tooSlow: false}).select('rt').median();
            if (mdn_rt < 300) {
                jsPsych.data.addProperties({boot: true, bootReason: 'tooFast'});
                jsPsych.endExperiment("The experiment has ended early due to overly-fast responding.");
            };
        },
        on_timeline_start: () => {
            trialIdx = 0;
            finalStreak = 0;
            currentStreak = 0;
        },
    };

   /*
    *
    *   QUESTIONS
    *
    */

    // scales
    const zeroToExtremely = ["0<br>A little", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>Extremely"];
    const zeroToALot = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10<br>A lot'];

    // constructor functions
    function MakeFlowQs(round) {
        this.type = jsPsychSurveyLikert;
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px; color:rgb(109, 112, 114)'>
        <p>Thank you for completing Round ${round+1} of Dot Detective!</p>
        <p>During Round ${round+1} of Dot Detective, to what extent did you feel<br><b>immersed</b> and <b>engaged</b> in what you were doing?</p>
        <p>Report the degree to which you felt immersed and engaged by answering the following questions.</p></div>`;
        this.questions = [
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During Round ${round+1} of Dot Detective, how <strong>absorbed</strong> did you feel in what you were doing?</div>`,
                name: `absorbed`,
                labels: ["0<br>Not very absorbed", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More absorbed than I've ever felt"],
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During Round ${round+1} of Dot Detective, how <strong>immersed</strong> did you feel in what you were doing?</div>`,
                name: `immersed`,
                labels: ["0<br>Not very immersed", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More immersed than I've ever felt"],
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During Round ${round+1} of Dot Detective, how <strong>engaged</strong> did you feel in what you were doing?</div>`,
                name: `engaged`,
                labels: ["0<br>Not very engaged", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More engaged than I've ever felt"],
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>During Round ${round+1} of Dot Detective, how <strong>engrossed</strong> did you feel in what you were doing?</div>`,
                name: `engrossed`,
                labels: ["0<br>Not very engrossed", '1', '2', '3', '4', '5', '6', '7', '8', '9', "10<br>More engrossed than I've ever felt"],
                required: true,
            },
        ];
        this.randomize_question_order = false;
        this.scale_width = 700;
        this.data = {round: round};
        this.on_finish = (data) => {
            dmPsych.saveSurveyData(data);
        };
    };

    function MakeEnjoyQs(round) {
        this.type = jsPsychSurveyLikert;
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px; color:rgb(109, 112, 114)'>

        <p>Below are a few more questions about Round ${round+1} of Dot Detective.</p>

        <p>Instead of asking about immersion and engagement, these questions ask about <strong>enjoyment</strong>.<br>
        Report how much you <strong>enjoyed</strong> Round ${round+1} of Dot Detective by answering the following questions.</p></div>`;
        this.questions = [
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much did you <strong>enjoy</strong> playing Round ${round+1} of Dot Detective?</div>`,
                name: `enjoyable`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much did you <strong>like</strong> playing Round ${round+1} of Dot Detective?</div>`,
                name: `like`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much did you <strong>dislike</strong> playing Round ${round+1} of Dot Detective?</div>`,
                name: `dislike`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How much <strong>fun</strong> did you have playing Round ${round+1} of Dot Detective?</div>`,
                name: `fun`,
                labels: zeroToALot,
                required: true,
            },
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How <strong>entertaining</strong> was Round ${round+1} of Dot Detective?</div>`,
                name: `entertaining`,
                labels: zeroToExtremely,
                required: true,
            },
        ];
        this.randomize_question_order = false;
        this.scale_width = 700;
        this.data = {round: round};
        this.on_finish = (data) => {
            dmPsych.saveSurveyData(data);
        };
    };

    function MakeEffortQs(round) {
        this.type = jsPsychSurveyLikert;
        this.questions = [
            {
                prompt: `<div style='color:rgb(109, 112, 114)'>How <b>effortful</b> was Round ${round+1} of Dot Detective?</div>`,
                name: `effort`,
                labels: zeroToExtremely,
                required: true,
            },
        ];
        this.randomize_question_order = false;
        this.scale_width = 700;
        this.data = {round: round};
        this.on_finish = (data) => {
            dmPsych.saveSurveyData(data);      
        };
    };

    p.block1 = {
        timeline: [new MakeAttnChk(0, settings.gameType), block1_wrapper, new MakeFlowQs(0), new MakeEnjoyQs(0), new MakeEffortQs(0)],
    };

    p.block2 = {
        timeline: [new MakeAttnChk(1, settings.gameType), block2_wrapper, new MakeFlowQs(1), new MakeEnjoyQs(1), new MakeEffortQs(1)],
    };

    p.consent = {
        type: jsPsychExternalHtml,
        url: "./static/consent.html",
        cont_btn: "advance",
    };

    p.demographics = (function() {

        const taskComplete = {
            type: jsPsychInstructions,
            pages: [`<div class='parent' style='color: rgb(109, 112, 114)'>
                    <p>Dot detective is now complete!</p>
                    <p>To finish this study, please continue to a few final surveys.</p>
                    </div>`], 
            show_clickable_nav: true,
            post_trial_gap: 500,
            allow_keys: false,
        };

        const gender = {
            type: jsPsychSurveyHtmlForm,
            preamble: '<p>What is your gender?</p>',
            html: `<div style="text-align: left">
            <p>Male <input name="gender" type="radio" value="male"/></p>
            <p>Female <input name="gender" type="radio" value="female"/></p>
            <p>Other: <input name="other" type="text"/></p>
            </div>`,
            on_finish: (data) => {
                data.gender = data.response.gender;
                data.gender_other = data.response.other;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                dmPsych.saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychSurveyHtmlForm,
            preamble: '<p>What is your race / ethnicity?</p>',
            html: `<div style="text-align: left">
            <p>White / Caucasian <input name="ethnicity" type="radio" value="white"/></p>
            <p>Black / African American <input name="ethnicity" type="radio" value="black"/></p>
            <p>East Asian (e.g., Chinese, Korean, Vietnamese, etc.) <input name="ethnicity" type="radio" value="east-asian"/></p>
            <p>South Asian (e.g., Indian, Pakistani, Sri Lankan, etc.) <input name="ethnicity" type="radio" value="south-asian"/></p>
            <p>Latino / Hispanic <input name="ethnicity" type="radio" value="hispanic"/></p>
            <p>Middle Eastern / North African <input name="ethnicity" type="radio" value="middle-eastern"/></p>
            <p>Indigenous / First Nations <input name="ethnicity" type="radio" value="indigenous"/></p>
            <p>Bi-racial <input name="ethnicity" type="radio" value="indigenous"/></p>
            <p>Other <input name="other" type="text"/></p>
            </div>`,
            on_finish: (data) => {
                data.ethnicity = data.response.ethnicity;
                data.ethnicity_other = data.response.other;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                dmPsych.saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [gender, age, ethnicity, english, finalWord]
        };

        return demos;

    }());

    p.save_data = {
        type: jsPsychPipe,
        action: "save",
        experiment_id: "d3QItVVt9Zeh",
        filename: dmPsych.filename,
        data_string: ()=>jsPsych.data.get().csv()
    };


    return p;

}());


// create timeline
const timeline = [exp.consent, exp.practice, exp.block1, exp.block2, exp.postTask, exp.demographics, exp.save_data];

// initiate timeline
jsPsych.run(timeline);

