// data for elizabot.js
// entries prestructured as layed out in Weizenbaum's description 
// [cf: Communications of the ACM, Vol. 9, #1 (January 1966): p 36-45.]

var elizaInitials = [
"Hey there! What would you like help with today: \n\n-> fitness goals\n-> motivation\n-> nutrition\n-> exercises",
"Welcome! Ready to crush some goals? Tell me how I can help with: \n\n-> fitness goals\n-> motivation\n-> nutrition\n-> exercises",
"Let's make today count, what are you working on? \n\n-> fitness goals\n-> motivation\n-> nutrition \n-> exercises"
];

var elizaFinals = [
"I'm proud of you, remember, consistency wins!",
"Catch you next time, stay strong!",
"You're crushing it! Keep it going!"
];

var elizaQuits = [
"bye",
"goodbye",
"done",
"exit",
"quit"
];

var elizaPres = [
"dont", "don't",
"cant", "can't",
"wont", "won't",
"maybe", "perhaps",
"certainly", "yes",
"were", "was",
"you're", "you are",
"i'm", "i am",
"same", "alike",
"it's", "it is",
"that's", "that is",
"wasn't", "was not",
"isn't", "is not",
"aren't", "are not",
"didn't", "did not",
"doesn't", "does not",
"shouldn't", "should not",
"couldn't", "could not",
"wouldn't", "would not",
"warm ups", "warm up",

//fitness
"workouts", "workout",
"exercises", "exercise",
"training", "train",
"working out", "workout",
"trained", "train",
"ran", "run",
"jogged", "run",
"lifted", "lift",
"ate", "eat",
"eating", "eat",
"snacked", "snack",
"cheated", "cheat",
"healthy", "fit",
"unhealthy", "not fit",
"fat", "overweight",
"skinny", "thin",
"stronger", "strong",
"weaker", "weak",
"nutritions","nutrition",
"meal preps","meal prep",
"meals","meal",
"macros","macronutrients",
"calories","calorie",
"goals","goal",
];

var elizaPosts = [
"am", "are",
"your", "my",
"me", "you",
"myself", "yourself",
"yourself", "myself",
"i", "you",
"you", "I",
"my", "your",
"i'm", "you are",

//fitness
"lazy", "unmotivated",
"unmotivated", "working on staying consistent",
"fat", "not feeling my best",
"weak", "building strength",
"strong", "focused and capable"
];

var elizaSynons = {
"be": ["am", "is", "are", "was"],
"belief": ["feel", "think", "believe", "wish"],
"cannot": ["can't"],
"desire": ["want", "need"],
"everyone": ["everybody", "nobody", "noone"],
"exercise": ["workout", "train", "fitness", "routine","exercises"],
"eat": ["diet", "nutrition", "meals", "food"],
"goal": ["target", "objective", "milestone, goals"],
"happy": ["elated", "glad", "better"],
"calorie": ["calorie", "calories"],
"protein": ["protein", "proteins"],
"sad": ["unhappy", "depressed", "sick"],
"macro": ["macros", "macronutrients"],
"meal": ["meal", "meals", "meal prep", "meal preps"],
"plateau": ["wall"],
"warm up": ["warm ups"],
"stress":["stressed","stressful"],
"motivate":["motivated", "motivation","motivates"],
"tons": ["lots","many","a lot","huge","big"]
};

var elizaKeywords = [

["xnone", 0, [
 ["*", [
     "Not sure I got that, but I'm here to help you move forward!",
     "Hmm, didn't quite get that—but if your head's foggy, maybe a walk or stretch would help",
     "Hey, if that was a brain dump, that's cool. Want to circle back to your fitness goals",
     "That is interesting.  Please continue.",
     "Oops, didn't quite follow—but that's okay. Let's take a breath and talk about what you need right now.",
     "Not sure what that meant, but I'm here to support. You up for moving, or is it a chill day?",
     "I didn't get that, but it's cool. Let's keep this low-pressure—what do you want to talk about right now?"
  ]]
]],
["default", 0, [
  ["*", [
    "Not sure what you meant, but let's bring it back to your fitness. What's your next goal?",
    "When in doubt, move your body. What's one thing you could do right now?"
   ]]
 ]],
["sorry", 0, [
 ["*", [
     "Please don't apologise.",
     "You don't owe me an apology—show up for yourself, not for me.",
     "Apologies not needed—just show up for yourself today.",
     "You're human. We don't aim for flawless, we aim for better than yesterday.",
     "Skip the apology. Own it, learn from it, and show up better today"
  ]]
]],
["injury", 8, [
  ["* i have an injury *", [
    "That's important—let's make sure you're healing first.",
    "What kind of injury are we talking about?",
    "Did a doctor or physio give you any recommendations?",
    "We can work around injuries. Want to talk safe movement options?",
    "Recovery is part of progress—let's respect that phase too."
  ]],
  ["* i got injured *", [
    "What happened?",
    "Injuries can be frustrating. How are you coping mentally?",
    "Do you think anything could have prevented it?",
    "Let's reflect so you can come back stronger and smarter.",
    "How's your recovery plan going so far?"
  ]]
]],
["pain", 7, [
  ["* i have pain *", [
    "Where exactly are you feeling pain?",
    "Pain is your body's way of talking to you—let's listen to it.",
    "You should rest up or go to the doctors if it keeps persisting!",
    "You might need to rest or modify your workouts—want to talk options?",
  ]],
  ["* workout caused pain *", [
    "Let's figure out what movement triggered it—can you describe it?",
    "Make sure to warm up properly before the session. It is very important to warm your muscles up before working sets.",
    "Are you performing the right form? Make sure you're doing it right and not harming yourself.",
    "Maybe we swap that movement out until you're healed up."
  ]]
]],
["routine", 7, [
  ["* my routine is *", [
    "Does your routine match your fitness goals?",
    "Is your routine something you enjoy, or does it feel like a chore?",
    "Have you made progress with this routine?",
    "Would it help to shake things up or simplify it?"
  ]],
  ["* shake up my routine *", [
    "Love that mindset! Change is where growth happens. Let's mix it up.",
    "Growth lives in discomfort. Let's make this next phase exciting and effective.",
    "Change isn't just good—it's necessary. Let's pivot and crush your next goal.",
  ]],
  ["* i need a new routine *", [
    "Let's talk goals first—what do you want this routine to achieve?",
    "How many days a week can you realistically commit?",
    "Do you prefer gym workouts, home workouts, or something else?",
    "Let's build a plan that fits *you*, not the other way around.",
    "What would make a routine feel exciting for you to follow?"
  ]]
]],
["fitness", 10, [
  ["* fitness goal *", [
    "What kind of fitness goals are you looking to make?",
    "Are you trying to get back into the gym? I can help you curate a workout plan",
    "What aspect of fitness interests you strength, endurance, beginner, or intermediate?"
  ]],
  ["* fitness goals *", [
    "What kind of fitness goals are you looking to make?",
    "Are you trying to get back into the gym? I can help you curate a workout plan",
    "What aspect of fitness interests you strength, endurance, beginner, or intermediate?",
  ]]
]],
["exercise", 15, [
  ["* exercise *", [
    "What kinds are you looking for?\n\n-> strength workout\n-> fat loss workout\n-> endurance workout\n-> 3 day workout\n-> 4 day workout\n-> beginner workout\n-> intermediate workout"
  ]],
  ["exercises", [
    "What kind of exercises? Strength, fat loss, endurance?"
  ]]
]],

["workout", 10, [
  ["* give me * a workout *", [
    "Let's get you started. What's your main goal—strength, fat loss, or endurance?",
    "Quick check—how many days a week can you train? I'll customize around that.",
    "To tailor your plan, what's your experience level: beginner, intermediate, or advanced?"
  ]],
  ["* make me * a workout *", [
    "Let's get you started. What's your main goal—strength, fat loss, or endurance?",
    "Quick check—how many days a week can you train? I'll customize around that.",
    "To tailor your plan, what's your experience level: beginner, intermediate, or advanced?"
  ]],
  ["* workout plan *", [
    "Let's get you started. What's your main goal—strength, fat loss, or endurance?",
    "Quick check—how many days a week can you train? I'll customize around that.",
    "To tailor your plan, what's your experience level: beginner, intermediate, or advanced?"
  ]],
  ["* strength workout *", [
    "Here's a 4-day strength-focused plan:\n\nDay 1 - Upper Strength:\n- Bench Press 4x6\n- Overhead Press 4x8\n- Incline Dumbbell Press 3x10\n- Triceps Dips 3x12\n\nDay 2 - Lower Strength:\n- Back Squats 4x6\n- Romanian Deadlifts 4x8\n- Walking Lunges 3x12/leg\n- Calf Raises 3x15\n\nDay 3 - Pull Strength:\n- Deadlifts 4x5\n- Pull-ups 3xMax\n- Barbell Rows 4x8\n- Dumbbell Curls 3x12\n\nDay 4 - Optional Active Recovery or Accessory Lifting\nWant help adding progressive overload to this?"
  ]],
  ["* fat loss workout *", [
    "Here's a 5-day fat-loss plan with a focus on metabolic conditioning:\n\nDay 1 - Full Body HIIT:\n- 3 rounds:\n  - Jump squats x15\n  - Push-ups x12\n  - Burpees x10\n  - Plank x30 sec\n\nDay 2 - Cardio Intervals:\n- 20-30 minutes alternating sprints and walks\n- Optional: Finisher of kettlebell swings and mountain climbers\n\nDay 3 - Strength Circuit:\n- Goblet Squats x12\n- Dumbbell Rows x10/arm\n- Overhead Press x12\n- Jump Rope 1 min\n(3 rounds, minimal rest)\n\nDay 4 - Core + LISS Cardio:\n- 20 min steady-state cardio (bike/walk)\n- Plank holds, leg raises, Russian twists\n\nDay 5 - MetCon Challenge:\n- 20 min AMRAP:\n  - 5 push-ups\n  - 10 air squats\n  - 15 jumping jacks\nWant meal prep ideas to pair with this?"
  ]],
  ["* endurance *", [
    "Here's a 6-day plan to boost endurance:\n\nDay 1 - Steady-State Run:\n- 30-45 min at conversational pace\n\nDay 2 - Lower Body Strength:\n- Squats 4x8\n- Step-ups 3x12/leg\n- RDLs 3x10\n- Core finisher: 3 rounds of 30s plank, 20 crunches\n\nDay 3 - Intervals:\n- 6 rounds:\n  - 2 min fast pace\n  - 1 min walk\n\nDay 4 - Cross-Training:\n- 30-40 min: swim, bike, or row\n- Stretch and foam roll after\n\nDay 5 - Tempo Run:\n- 20 min warm-up + 15 min hard pace + 10 min cooldown\n\nDay 6 - Long Slow Distance:\n- 60+ minutes steady aerobic work\n?"
  ]], 
  ["* endurance workout *", [
    "Here's a 6-day plan to boost endurance:\n\nDay 1 - Steady-State Run:\n- 30-45 min at conversational pace\n\nDay 2 - Lower Body Strength:\n- Squats 4x8\n- Step-ups 3x12/leg\n- RDLs 3x10\n- Core finisher: 3 rounds of 30s plank, 20 crunches\n\nDay 3 - Intervals:\n- 6 rounds:\n  - 2 min fast pace\n  - 1 min walk\n\nDay 4 - Cross-Training:\n- 30-40 min: swim, bike, or row\n- Stretch and foam roll after\n\nDay 5 - Tempo Run:\n- 20 min warm-up + 15 min hard pace + 10 min cooldown\n\nDay 6 - Long Slow Distance:\n- 60+ minutes steady aerobic work\n?"
  ]],  
  ["* 3 day workout *", [
    "Here's a 3 day strength-based split:\n\nDay 1 - Push:\n- Bench Press 3x8\n- Overhead Press 3x10\n- Triceps Dips 3x12\n\nDay 2 - Pull:\n- Deadlifts 3x6\n- Pull-ups 3xMax\n- Dumbbell Rows 3x10\n\nDay 3 - Legs:\n- Squats 3x8\n- Lunges 3x12 each leg\n- Romanian Deadlifts 3x10"
  ]],
  
  ["* 4 day workout*", [
    "Here's a 4 day strength + hypertrophy routine:\n\nDay 1 - Upper Strength\nDay 2 - Lower Strength\nDay 3 - Upper Volume\nDay 4 - Lower Volume\n\nSample Upper Strength:\n- Bench Press 4x6\n- Barbell Row 4x8\n- Overhead Press 3x8\n- Pull-ups 3xMax"
  ]],

  ["* beginner workout*", [
    "Starting fresh? Try this 3x/week routine:\n\nDay 1 - Full Body:\n- Chair Squats x12\n- Wall Push-ups x10\n- Deadbugs x12 each side\n\nRepeat for 2 rounds. Focus on form over speed."
  ]],

  ["* intermediate workout *", [
    "Level up with this:\n\n- Jump Squats x15\n- Push-up to Shoulder Tap x10\n- Single-Leg Glute Bridge x10 each\n- Side Plank x30s per side\n\n3 rounds. Minimal rest. "
  ]]
]],

["motivation", 7, [
  ["* motivation *", [
    "What about motivation? Do you feel that you are lacking motivation?",
  ]],
  ["* no motivation *", [
    "Motivation dips are normal. What's been draining your drive lately?",
    "Would changing up your routine help spark some new energy?"
  ]],
  ["* i feel little motivation *", [
    "Motivation dips are normal. What's been draining your drive lately?",
    "Would changing up your routine help spark some new energy?"
  ]],
  ["* i feel lots of motivation *", [
    "That's awesome—what's been firing you up lately?",
    "Let's build on that momentum. Got a workout plan ready?",
    "Motivation is powerful—how can we lock that in for the long run?",
    "How do you plan to use that motivation today?",
    "Keep that spark alive. What's the next step you're planning?"
  ]],
]],
["motivate", 5, [
    ["* motivate me *", [
      "You got this. Remember why you started.",
      "Every rep, every step—you're building the future you want.",
      "Discipline > motivation. But let's use this moment to push!",
      "Think of how you'll feel after. Stronger, prouder, more alive.",
    ]],
]],
["fitnes goals", 5, [
  ["* ... *", [
    "You got this. Remember why you started.",
    "Every rep, every step—you're building the future you want.",
    "Discipline > motivation. But let's use this moment to push!",
    "Think of how you'll feel after. Stronger, prouder, more alive.",
  ]],
]],
["warm up", 5, [
  ["* warm up | warm ups | warm up ideas *", [
    "Try this dynamic warm-up:\n- Arm Circles x20\n- Leg Swings x15/leg\n- Jumping Jacks x30 sec\n- Bodyweight Squats x15\nReady to go now?",
    "Here's a quick activation circuit:\n- Glute Bridges x20\n- Shoulder Taps x20\n- Air Squats x15\nGets blood moving without burnout."
  ]],
  ["* warm ups *", [
    "Try this dynamic warm-up:\n- Arm Circles x20\n- Leg Swings x15/leg\n- Jumping Jacks x30 sec\n- Bodyweight Squats x15\nReady to go now?",
    "Here's a quick activation circuit:\n- Glute Bridges x20\n- Shoulder Taps x20\n- Air Squats x15\nGets blood moving without burnout."
  ]],
  ["* warm up ideas *", [
    "Try this dynamic warm-up:\n- Arm Circles x20\n- Leg Swings x15/leg\n- Jumping Jacks x30 sec\n- Bodyweight Squats x15\nReady to go now?",
    "Here's a quick activation circuit:\n- Glute Bridges x20\n- Shoulder Taps x20\n- Air Squats x15\nGets blood moving without burnout."
  ]],
  ["* give me * warm up *", [
    "Sure! Try this:\n- 1 min Jumping Jacks\n- 15 Squats\n- 10 Push-ups\n- 30 sec Plank",
    "Start with:\n- Arm Swings\n- Leg Swings\n- Hip Circles\n- Jog in place\n"
  ]],
]],
["cool down", 5, [
  ["* cool down *", [
    "Here's a cool-down flow:\n- Forward fold stretch (30 sec)\n- Seated hamstring stretch (30 sec/leg)\n- Child's pose (45 sec)\n- Deep breathing x5\nRecovery starts now.",
    "Wind down with this:\n- Wall sit (30s)\n- Calf stretch on stair (30s/side)\n- Hip flexor stretch (30s/side)\n- Box breathing for 1 min"
  ]]
]],
["stress", 5, [
  ["* i'm feeling some stress *", [
    "You don't have to fight your body when you're stressed, listen to it. ",
    "Training under stress can be useful, or it can totally break you. Let's fine the balance.",
    "High stress? Low stakes. Just move a little, breathe and call it a win today.",
    "Be gentle on yourself. It's okay to rest."
  ]],
  ["* my life's stressful *", [
    "Moving your body helps clear your mind. Even 10 minutes can shift things.",
    "Let's channel that stress into something positive. How about some energizing movement?"
  ]],
]],
["nutrition", 5, [
  ["* nutrition *", [
    "what about nutrition? meal prep, diet, what to eat while maintaining, in a deficit, during a bulk or something else?"
  ]],
]],
["diet", 5, [
  ["* high protein diet *", [
    "Try including more of these: eggs, lean meats, Greek yogurt, tofu, lentils, and cottage cheese.",
    "Protein-rich options: chicken breast, whey protein, chickpeas, and low-fat dairy. Want a sample meal plan?",
    "Great choices include eggs, fish, quinoa, and Greek yogurt. Want help calculating your protein needs?"
  ]],
  ["* vegan diet *", [
    "That's great! Make sure to get in your veggies, grains, nuts, seeds!"
  ]],
  ["* low carb diet *", [
    "Low carb can be effective for fat loss or blood sugar control. Focus on proteins, leafy greens, and healthy fats like avocado or olive oil.",
    "Try swapping out grains for cauliflower rice or zucchini noodles. Stick to lean proteins and fiber-rich veggies."
  ]],
  ["* diet *", [
    "How do you feel about your current diet?",
    "Have you noticed any changes in energy or performance based on your diet?",
    "What's working well with your diet—and what's not?",
    "Are you following a specific plan, or just eating intuitively?"
  ]],
  ["* my diet is *", [
    "How do you feel about your current diet?",
    "Does your diet support your fitness goals?",
    "Have you noticed any changes in energy or performance based on your diet?",
    "What's working well with your diet—and what's not?",
    "Are you following a specific plan, or just eating intuitively?"
  ]],
  ["* i need help with my diet *", [
    "Let's start with the basics—how many meals do you usually eat a day?",
    "Are you struggling more with planning, cooking, or staying consistent?",
    "Would tracking your meals for a week help give you clarity?",
    "What's the hardest part about sticking to your diet?",
    "Let's set a simple, sustainable change you can make today."
  ]],
]],
["meal prep", 7, [
  ["* meal prep *", [
    "Smart move. I'd suggest you batch cook proteins, roast veggies, and prep carbs like rice or sweet potato in bulk.",
   "Just start simple: Pick 1 protein, 1 carb, 1 veg—repeat. Fuel matters more than flavor perfection."
 ]],
  ["* help me meal prep *", [
     "Smart move. Batch cook proteins, roast veggies, and prep carbs like rice or sweet potato in bulk.",
    "Start simple: Pick 1 protein, 1 carb, 1 veg—repeat. Fuel matters more than flavor perfection."
  ]],
  ["* i want to meal prep *", [
    "Smart move. Batch cook proteins, roast veggies, and prep carbs like rice or sweet potato in bulk.",
   "Start simple: Pick 1 protein, 1 carb, 1 veg—repeat. Fuel matters more than flavor perfection."
 ]]
]],
["macros", 5, [
  ["* macros *", [
      "Tracking macros is smart—are you aiming for a certain ratio?",
      "Do you know your daily protein, carb, and fat targets?",
      "Want help estimating your macros for fat loss or muscle gain?"
  ]]
]],
["calorie", 7, [
    ["* calorie *", [
      "Are you trying to stay in a deficit, maintain, or bulk?",
      "Knowing your maintenance calories is key—want to calculate it together?",
      "Do you track calories, or eat intuitively?"
    ]],
    ["* how much calories *", [
      "Are you trying to stay in a deficit, maintain, or bulk?",
      "Knowing your maintenance calories is key—want to calculate it together?",
      "Do you track calories, or eat intuitively?"
    ]]
]],
["protein", 10, [
    ["* how much protein *", [
      "A good target is 0.8 to 1g per pound of bodyweight.",
      "Protein fuels recovery—what's your weight and fitness goal?",
      "If you train regularly, aim for 1g of protein per pound of lean body mass."
    ]],
    ["* how much protein should i eat *", [
      "Let's dial that in—tell me your weight and whether you want to build muscle or lose fat.",
      "Roughly 1 gram per pound of bodyweight is a solid guideline."
    ]]
]],
["eat", 15, [
    ["* how much should i eat *", [
      "Depends on your goal. Want fat loss, maintenance, or muscle gain?",
      "Let's start with a ballpark: 12x bodyweight in lbs for fat loss, 15x for maintenance, 18x for bulking. Want to calculate?"
    ]],
    ["* what should i eat in a deficit *", [
      "To lose fat, you'll need to eat fewer calories than you burn. A moderate deficit—about 20% under your maintenance—is ideal to drop fat while keeping muscle.",
      "Fat loss means energy deficit. Cut calories slightly, prioritize protein (0.8-1g per lb), and stay consistent. Want to calculate a daily target?",
      "In a deficit, your body turns to stored fat for energy. But cut too hard and you risk muscle loss and fatigue. Let's find your sweet spot."
    ]],
    ["* what should i eat *", [
      "Prioritize protein, fiber, and water. Then layer in complex carbs and healthy fats.",
      "Keep it real. Chicken, eggs, oats, greens, berries. Not sexy—but it works."
    ]],
    ["* what should i eat while maintaining *", [
      "When maintaining, eat around your TDEE—balance protein (~1g/lb), carbs, and fats.",
      "Maintenance is about consistency. Prioritize nutrient-dense foods and adequate hydration."
    ]],
    ["* what should i eat in a bulk *", [
      "In a bulk, focus on a calorie surplus with high-protein foods (1g/lb), whole grains, and healthy fats.",
      "You’ll want energy-dense foods: oats, rice, nut butters, lean meats, eggs, olive oil."
    ]]
]],
["deficit", 5, [
  ["* in a deficit *", [
    "To lose fat, you'll need to eat fewer calories than you burn. A moderate deficit—about 20% under your maintenance—is ideal to drop fat while keeping muscle."
  ]],
  ["* deficit *", [
    "Fat loss means energy deficit. Cut calories slightly, prioritize protein (0.8-1g per lb), and stay consistent."
  ]]
]],

["tired", 4, [
  ["* i am tired *", [
    "Rest is part of the plan—have you been getting enough sleep?",
    "Is it physical tiredness or more mental/emotional burnout?",
    "Sometimes a short walk or light stretch can actually re-energize you.",
    "Do you think you're overtraining, or is something else weighing on you?",
    "Let's listen to your body. Maybe today is an active recovery day."
  ]],
  ["* i'm too tired *", [
    "Would a quick warm-up help shift your energy?",
    "What if you just did 10 minutes—no pressure to go all out?",
    "Sometimes showing up tired is still a win. What's doable right now?",
    "Even a light session can help you feel better afterward.",
    "What's making you feel so run down today?"
  ]],
  
]],
["burnout", 6, [
  ["* i feel so burnt out *", [
    "Burnout happened when you go all gas, no brakes. Take it easy, and rest.",
    "If your tank's empty, more effort won't help. Refuel yourself and begin again.",
    "That's okay! Your body rebuilds during recovery, not during the grind.",
    "Burnout isn't weakness—it's a signal. Time to listen, not push harder."
  ]],
]],
["plateau", 4, [
  ["* i've hit a plateau *", [
    "That's completely okay! Progress isn't always visible—but it's always building.",
    "Stuck doesn't mean broken. It means it's time to adjust, not quit.",
    "Plateaus aren't punishment, they're a sign you've outgrown your routine. Time to evolve!"
  ]],
  ["* i've hit a wall*", [
    "Rest is part of the plan—have you been getting enough sleep?",
    "Is it physical tiredness or more mental/emotional burnout?",
    "Plateaus are frustrating—but they're also a sign you've been consistent. That's not failure."
  ]],

]],
["goal", 6, [
  ["* my goal is *", [
    "That's a strong goal. Why is (2) important to you?",
    "What's your timeline for reaching (2)?",
    "Have you broken (2) into smaller, weekly steps?",
    "What's one habit that will help you move toward (2) today?",
    "Do you feel (2) is realistic and exciting for you?"
  ]],
  ["* i have no goals *", [
    "No worries. Let's figure one out together.",
    "Would it help to focus on a feeling instead—like having more energy?",
    "How do you want to feel in 30 days?",
    "What's something you've always wanted to achieve but haven't started yet?",
    "Sometimes the best first goal is just consistency. Want to start there?"
  ]]
]],
["consistency", 6, [
  ["* i struggle with consistency *", [
    "You're not alone—consistency is often the hardest part. What's been getting in the way?",
    "Would having a daily or weekly routine help you build momentum?",
    "Sometimes small wins build big habits. What's one thing you could commit to daily?",
    "Let's troubleshoot—what throws you off your routine most often?",
    "Do you think your goal is too big or not motivating enough right now?"
  ]],
  ["* how do i stay consistent *", [
    "What worked for you in the past when you felt more consistent?",
    "Would a specific schedule or checklist help keep you on track?",
    "Staying consistent is more about systems than willpower. Let's build one.",
    "Accountability helps. Do you have someone checking in with you?",
    "Start small and win daily—that builds real consistency."
  ]]
]],
["can't", 5, [
  ["* i can't *", [
    "What makes you feel like you can't (2)?",
    "Have you tried breaking (2) into smaller steps?",
    "You might be stronger than you think—what's really stopping you?",
    "Is it a physical barrier, or a mindset thing?",
    "Would it help if we found a different way to approach (2)?"
  ]],
  ["* i can't seem to *", [
    "Sometimes consistency is the hardest part. What's been tripping you up with (2)?",
    "Let's figure out what's not working so we can adjust.",
    "What happens when you try to (2)?",
    "Are there patterns that make (2) harder for you?",
    "Let's find a method that works for *you* to (2)."
  ]]
]],
["if", 3, [
 ["* if *", [
     "Do you think it's likely that (2) ?",
     "Do you wish that (2) ?",
     "What do you know about (2) ?",
     "Really, if (2) ?",
     "What would you do if (2) ?",
     "But what are the chances that (2) ?",
     "What does this speculation lead to ?"
  ]]
]],
["perhaps", 0, [
 ["*", [
     "You don't seem quite certain.",
     "Why the uncertain tone ?",
     "You aren't sure ?",
     "Don't you know ?",
  ]]
]],
["name", 15, [
 ["*", [
     "I am not interested in names.",
     "I've told you before, I don't care about names -- please continue."
  ]]
]],
["deutsch", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand German."
  ]]
]],
["francais", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand French."
  ]]
]],
["italiano", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand Italian."
  ]]
]],
["espanol", 0, [
 ["*", [
     "goto xforeign",
     "I told you before, I don't understand Spanish."
  ]]
]],
["xforeign", 0, [
 ["*", [
     "I speak only English."
  ]]
]],
["hello", 0, [
 ["*", [
     "How do you do.  Please state your problem.",
     "Hi.  What seems to be your problem ?"
  ]]
]],
["am", 0, [
 ["* am i *", [
     "Do you believe you are (2) ?",
     "Would you want to be (2) ?",
     "Do you wish I would tell you you are (2) ?",
     "What would it mean if you were (2) ?",
     "goto what"
  ]],
 ["* i am *", [
     "goto i"
  ]],
 ["*", [
     "Why do you say 'am' ?",
     "I don't understand that."
  ]]
]],
["are", 0, [
 ["* are you *", [
     "Why are you interested in whether I am (2) or not ?",
     "goto what",
     "Would it matter to you ?",
  ]],
 ["* you are *", [
     "goto you"
  ]],
 ["* are *", [
     "Did you think they might not be (2) ?",
     "Would you like it if they were not (2) ?",
     "What if they were not (2) ?",
     "Are they always (2) ?",
     "Possibly they are (2).",
     "Are you positive they are (2) ?"
  ]]
]],
["your", 0, [
 ["* your *", [
     "What about your own (2) ?",
     "Really, my (2) ?",
     "What makes you think of my (2) ?",
  ]]
]],
["was", 2, [
 ["* was i *", [
     "What if you were (2) ?",
     "Do you think you were (2) ?",
     "Were you (2) ?",
     "What would it mean if you were (2) ?",
     "What does ' (2) ' suggest to you ?",
     "goto what"
  ]],
 ["* i was *", [
     "Were you really ?",
     "Perhaps I already know you were (2)."
  ]],
 ["* was you *", [
     "Would you like to believe I was (2) ?",
     "What suggests that I was (2) ?",
     "What do you think ?",
     "Perhaps I was (2).",
     "What if I had been (2) ?"
  ]]
]],
["i", 0, [
 ["* i @desire *", [
     "What would it mean to you if you got (3) ?",
     "Why do you want (3) ?",
     "Suppose you got (3) soon.",
     "What if you never got (3) ?",
     "What would getting (3) mean to you ?",
     "What does wanting (3) have to do with this discussion ?"
  ]],
 ["* i am* @sad *", [
     "I am sorry to hear that you are (3).",
     "Do you think exercising will help you not to be (3) ?",
     "I'm sure it's not pleasant to be (3), but maybe some movement would help you release those emotions.",
  ]],
 ["* i am* @happy *", [
     "How have I helped you to be (3) ?",
     "Has exercising made you (3) ?",
     "What makes you (3) just now ?",
  ]],
 ["* i was *", [
     "goto was"
  ]],
 ["* i @belief i *", [
     "Do you really think so ?",
     "But you are not sure you (3).",
     "Do you really doubt you (3) ?"
  ]],
 ["* i* @belief *you *", [
     "goto you"
  ]],
 ["* i am *", [
     "Is it because you are (2) that you came to me ?",
     "How long have you been (2) ?",
     "Do you believe it is normal to be (2) ?",
     "Do you enjoy being (2) ?",
     "Do you know anyone else who is (2) ?"
  ]],
 ["* i @cannot *", [
     "Maybe not yet—but that doesn't mean never. Let's work toward it.",
     "You don't need to crush it—just start it.",
     "That might be true today, but you won't be in the same place forever. Progress is coming.",
     "Cool—then let's pivot. What can you do right now?",
     "What if you could (3) ?"
  ]],
 ["* i don't *", [
     "Don't you really (2) ?",
     "Why don't you (2) ?",
  ]],
 ["*", [
     "You say (1) ?",
     "Can you elaborate on that ?",
     "Do you say (1) for some special reason ?",
     "That's quite interesting, please elaborate."
  ]]
]],
["you", 0, [
 ["* you remind me of *", [
     "goto alike"
  ]],
 ["* you *", [
     "We were discussing you -- not me.",
     "Oh, I (2) ?",
     "What are your feelings now ?",
     "Let's focus on you instead!"
  ]]
]],
["yes", 0, [
 ["*", [
     "You seem to be quite positive.",
     "You are sure.",
     "I see.",
     "I understand.",
     "Period queen!"
  ]]
]],
["no", 0, [
 ["*", [
     "Are you saying no just to be negative?",
     "Why not ?",
     "Why 'no' ?"
  ]]
]],
["my", 2, [
 ["$ * my *", [
     "Does that have anything to do with the fact that your (2) ?",
     "Lets discuss further why your (2).",
     "But your (2)."
  ]],
 ["* my *", [
     "Your (2) ?",
     "Why do you say your (2) ?",
     "Is it important to you that your (2) ?"
  ]]
]],
["can", 0, [
 ["* can you *", [
     "You believe I can (2) don't you ?",
     "goto what",
     "You want me to be able to (2).",
     "Perhaps you would like to be able to (2) yourself."
  ]],
 ["* can i *", [
     "Whether or not you can (2) depends on you more than on me.",
     "Do you want to be able to (2) ?",
     "Perhaps you don't want to (2).",
     "goto what"
  ]]
]],
["what", 0, [
 ["*", [
     "Why do you ask ?",
     "Good question—what part are you unsure about: the plan, the habit, or the mindset?",
     "What is it you really want to know ?",
     "Are such questions much on your mind ?",
     "What do you think ?",
     "What comes to mind when you ask that ?",
     "Have you asked such questions before ?",
     "Totally fair to ask, lets clarify together.",
     "What's one win from this week—physical, mental, or even just showing up?",
     "What are you really asking—if you can do this, or if it's worth trying? (It is.)"

  ]]
]],
["who", 0, [
 ["who *", [
     "goto what"
  ]]
]],
["when", 0, [
 ["when *", [
     "goto what"
  ]]
]],
["where", 0, [
 ["where *", [
     "goto what"
  ]]
]],
["how", 0, [
 ["how *", [
     "goto what"
  ]]
]],
["because", 0, [
 ["*", [
     "Is that the real reason ?",
     "Fair. But is that reason helping you grow, or holding you back?",
     "Does that reason seem to explain anything else ?",
     "Because... what? No pressure, but I'm listening if you want to finish the thought.",
     "If you're trailing off, that's okay. Let's bring it back—what do you need right now?"

  ]]
]],
["why", 0, [
 ["* why don't you *", [
     "Perhaps I will (2) in good time.",
     "Should you (2) yourself ?",
     "You want me to (2) ?",
     "goto what"
  ]],
 ["* why can't i *", [
     "Do you think you should be able to (2) ?",
     "Do you want to be able to (2) ?",
     "Do you believe this will help you to (2) ?",
     "Have you any idea why you can't (2) ?",
     "goto what"
  ]],
 ["*", [
     "goto what"
  ]]
]],
["everyone", 2, [
 ["* @everyone *", [
     "Really, (2) ?",
     "Surely not (2).",
     "Can you think of anyone in particular ?",
     "Who, for example?",
     "Who, may I ask ?",
     "Who do you think you're talking about ?"
  ]]
]],
["everybody", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["nobody", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["noone", 2, [
 ["*", [
     "goto everyone"
  ]]
]],
["always", 1, [
 ["*", [
     "Can you think of a specific example ?",
     "When ?",
     "What are you thinking of ?",
     "Really, always ?"
  ]]
]],
["alike", 10, [
 ["*", [
     "In what way ?",
     "You're not alone. Feeling alike is part of the process—but your outcomes are 100% yours to earn.",
     "How ?",
     "It's cool to see similarities, but remember—you've got your own wins to claim."
  ]]
]],
["like", 10, [
 ["* @be *like *", [
     "goto alike"
  ]]
]],
["different", 0, [
 ["*", [
     "How is it different ?",
     "What differences do you see ?",
     "What does that difference suggest to you ?",
     "What other distinctions do you see ?",
     "What do you suppose that disparity means ?",
     "Could there be some connection, do you suppose ?",
     "How ?"
  ]]
]]

];

// regexp/replacement pairs to be performed as final cleanings
// here: cleanings for multiple bots talking to each other
var elizaPostTransforms = [
	/ old old/g, " old",
	/\bthey were( not)? me\b/g, "it was$1 me",
	/\bthey are( not)? me\b/g, "it is$1 me",
	/Are they( always)? me\b/, "it is$1 me",
	/\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
	/\bI to have (\w+)/, "I have $1",
	/Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];

// eof