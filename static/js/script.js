window.addEventListener("load", (event) => {
    const typewriterElement = document.querySelector(".typewriter_text");
    const typewriterText = "Multicutural photographer and filmmaker based in Brussels. I create works that expore the hidden layers of intimacy, invisible tensions, and emotional power dynamics. \n Positioned between fiction and observation, my practice delves into psychological complexity through ambivalent characters and charged atmospheres. \n I aim to craft sensorial, embodied narratives that oscillate between control and surrender."
    
    // Display the text we pass as an arg with a typewriter effect.
    // Arguments
    // element : the html element on which we want the effect on.
    // text : the text this element will have with the effect.
    // i = 0 : the index of each character of that text.
    const textTypingEffect = (element, text, i = 0) => {
        if (i === 0) {
            element.textContent = ""
        }

        element.textContent += text[i]
        if (i === text.length -1 ) {
            return
        }
        setTimeout(() => textTypingEffect(typewriterElement, typewriterText, i + 1), 10)
        
    }

    textTypingEffect(typewriterElement, typewriterText)
  });

