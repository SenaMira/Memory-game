// Select the Start Game Button
document.querySelector(".control-buttons span").onclick = function () {

    // Prompt window To Ask for Name
    let yourName = prompt("Whats Your Name?");

    // If Name Is Empty
    if (yourName == null || yourName == "") {
        // Set Name As Unknown
        document.querySelector(".name span").innerHTML = "Unknown";

        // Name Is Empty
    } else {
        // Set The Enter Name To Your Name
        document.querySelector(".name span").innerHTML = yourName;
    }

    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
};

let duration = 1000;

let blocksContainer = document.querySelector(".memory-game-blocks");

let blocks = Array.from(blocksContainer.children);

// Create Range Of Keys
// let orderRange = [...Array(blocks.length).keys()];  

let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange);


// Add Order Css Property To Game Blocks

blocks.forEach((block, index) => {
    // Add CSS Order Property
    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener("click", function () {
        // Trigger The Flip Block Function
        flipBlock(block);
    });
});

// Flip Block Function
function flipBlock(selectedBlock) {

    // Add Class is-flipped
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If Theres Two Selected Blocks
    if (allFlippedBlocks.length === 2) {

    // console.log('Two Flipped Blocks Selected');

    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

    }

}

// Stop Clicking Function
function stopClicking() {

    // Add Class No Clicking on Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {
        // Remove Class No Clicking After The Duration
        blocksContainer.classList.remove('no-clicking');
    }, duration);
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");

        document.getElementById("success").play();

    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);

        document.getElementById("fail").play();
    }
}

// Shuffle Fynction

function shuffle(array) {

    // Settings Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease Length By One
        current--;

        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}

// Current Array [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// New Array [1, 2, 3, 0, 5, 9, 7, 8, 6, 4]
/*
    [1] Save Current Element in Stash
    [2] Current Element = Random Element
    [3] Random Element = Get Element From Stash
*/