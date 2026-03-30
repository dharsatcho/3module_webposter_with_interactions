document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.first_section_overlay_button');
  const movingImage = document.querySelector('.moving-image');

  button.addEventListener('click', () => {
  movingImage.classList.add('moved');
  button.classList.add('moved');
});
  });

  document.addEventListener('DOMContentLoaded', () => {
    // ----- Элементы DOM -----
    const eyesImg = document.querySelector('.eyes-img');
    const formImg = document.querySelector('.form-img');
    const bodyImg = document.querySelector('.body-img');
    const mainChar = document.querySelector('.main-character-img');
    const againBtn = document.querySelector('.again_button_create_char');
    const winBtn = document.querySelector('.win_button_create_char');
    const popup = document.querySelector('.popup_create_char');
    const closePopupBtn = document.querySelector('.close_popup_button_create_char');
    const startAgainPopupBtn = document.querySelector('.again_popup_button_create_char');

    // ----- Массивы изображений (в порядке от first до fourth) -----
    const eyesImages = [
        'eyes_first.svg',
        'eyes_second.svg',
        'eyes_third.svg',
        'eyes_fourth.svg'
    ];
    const formImages = [
        'form_first.svg',
        'form_second.svg',
        'form_third.svg',
        'form_fourth.svg'
    ];
    const bodyImages = [
        'body_first.svg',
        'body_second.svg',
        'body_third.svg',
        'body_fourth.svg'
    ];

    // ----- Текущие индексы (0 = first) -----
    let eyesIndex = 0;
    let formIndex = 0;
    let bodyIndex = 0;

    // ----- Функция обновления основного изображения -----
    function updateMainCharacter() {
        // Формируем имя файла: eyesNum_formNum_bodyNum_variant.svg
        // Например: 1_1_1_variant.svg, 2_3_4_variant.svg
        const filename = `${eyesIndex+1}_${formIndex+1}_${bodyIndex+1}_variant.svg`;
        mainChar.src = 'images/' + filename;
        // Для отладки можно вывести в консоль
        console.log('Updated main character:', filename);
    }

    // ----- Функция обновления изображений слайдеров -----
    function updateSliders() {
        eyesImg.src = 'images/' + eyesImages[eyesIndex];
        formImg.src = 'images/' + formImages[formIndex];
        bodyImg.src = 'images/' + bodyImages[bodyIndex];
    }

    // ----- Сброс всех значений на first -----
    function resetToDefault() {
        eyesIndex = 0;
        formIndex = 0;
        bodyIndex = 0;
        updateSliders();
        updateMainCharacter();
        // Если попап открыт, закрываем его
        if (popup.classList.contains('active')) {
            popup.classList.remove('active');
        }
    }

    // ----- Изменение значения слайдера -----
    function changeSlider(sliderType, delta) {
        switch(sliderType) {
            case 'eyes':
                eyesIndex = (eyesIndex + delta + 4) % 4;
                eyesImg.src = 'images/' + eyesImages[eyesIndex];
                break;
            case 'form':
                formIndex = (formIndex + delta + 4) % 4;
                formImg.src = 'images/' + formImages[formIndex];
                break;
            case 'body':
                bodyIndex = (bodyIndex + delta + 4) % 4;
                bodyImg.src = 'images/' + bodyImages[bodyIndex];
                break;
            default:
                return;
        }
        updateMainCharacter();
    }

    // ----- Обработчики событий для кнопок слайдеров -----
    // Используем делегирование, так как кнопок несколько
    document.querySelectorAll('.left-btn, .right-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const slider = btn.getAttribute('data-slider');
            const delta = btn.classList.contains('left-btn') ? -1 : 1;
            changeSlider(slider, delta);
        });
    });

    // ----- Кнопка Again (сброс) -----
    againBtn.addEventListener('click', resetToDefault);

    // ----- Кнопка Win (показ попапа) -----
    winBtn.addEventListener('click', () => {
        popup.classList.add('active');
    });

    // ----- Закрытие попапа по крестику -----
    closePopupBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // ----- Кнопка Start Again внутри попапа (сброс и закрытие) -----
    startAgainPopupBtn.addEventListener('click', () => {
        resetToDefault();
        // попап уже закрыт внутри resetToDefault, но если нет — закроем явно
        if (popup.classList.contains('active')) {
            popup.classList.remove('active');
        }
    });

    // ----- Закрытие попапа при клике на фон (опционально) -----
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });

    // Инициализация начальных состояний
    updateSliders();
    updateMainCharacter();
});



document.addEventListener('DOMContentLoaded', () => {
    // ---------- Логика для первых четырёх карточек ----------
    const cards = document.querySelectorAll('.phrase-card:not(.trigger-card)');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const cloud = card.querySelector('.friend-cloud');
            if (!cloud) return;
            // Показываем облако
            cloud.classList.remove('hidden');
            cloud.classList.add('visible');
            // Через 3 секунды скрываем
            setTimeout(() => {
                cloud.classList.remove('visible');
                cloud.classList.add('hidden');
            }, 3000);
        });
    });

    // ---------- Логика для пятого (триггерного) блока ----------
    const triggerCard = document.querySelector('.trigger-card');
    const victoryPopup = document.querySelector('.popup_searching_a_friend');
    const closePopupBtn = victoryPopup?.querySelector('.close_popup_button_searching_a_friend');
    const startAgainBtn = victoryPopup?.querySelector('.again_popup_button_searching_a_friend');

    let timeoutId = null; // для таймера победы

    if (triggerCard) {
        triggerCard.addEventListener('click', (e) => {
            e.stopPropagation();
            // Показываем облако у триггера (если есть)
            const triggerCloud = triggerCard.querySelector('.friend-cloud');
            if (triggerCloud) {
                triggerCloud.classList.remove('hidden');
                triggerCloud.classList.add('visible');
                // Облако скроется через 3 секунды (стандартно), но победа наступит через 5
                setTimeout(() => {
                    triggerCloud.classList.remove('visible');
                    triggerCloud.classList.add('hidden');
                }, 3000);
            }

            // Если уже есть запущенный таймер – сбросим (чтобы не было двойной победы)
            if (timeoutId) clearTimeout(timeoutId);
            // Через 5 секунд засчитываем победу
            timeoutId = setTimeout(() => {
                if (victoryPopup) {
                    victoryPopup.classList.add('active');
                }
                timeoutId = null;
            }, 3000);
        });
    }

    // ---------- Закрытие попапа и сброс состояния ----------
    function resetTrigger() {
        if (victoryPopup) victoryPopup.classList.remove('active');
        // Сброс таймера, если попап закрыли вручную
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
        // Дополнительно: можно скрыть все облака на всякий случай
        document.querySelectorAll('.friend-cloud').forEach(cloud => {
            cloud.classList.remove('visible');
            cloud.classList.add('hidden');
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', resetTrigger);
    }
    if (startAgainBtn) {
        startAgainBtn.addEventListener('click', resetTrigger);
    }
    // Клик по фону попапа – тоже закрытие
    if (victoryPopup) {
        victoryPopup.addEventListener('click', (e) => {
            if (e.target === victoryPopup) resetTrigger();
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const stopSection = document.querySelector('.game_stop');
    const trafficLight = document.querySelector('.traffic_lighter');
    const stopTitle = document.querySelector('.stop_sign_title');
    const victoryPopup = document.querySelector('.popup_searching_a_friend');
    const closePopupBtn = victoryPopup?.querySelector('.close_popup_button_searching_a_friend');
    const startAgainBtn = victoryPopup?.querySelector('.again_popup_button_searching_a_friend');
    const bulbs = [
        document.querySelector('.traffic_light_bulb_red'),
        document.querySelector('.traffic_light_bulb_yellow'),
        document.querySelector('.traffic_light_bulb_green')
    ].filter(Boolean);

    if (!stopSection || !trafficLight || !stopTitle || bulbs.length !== 3 || !victoryPopup) {
        return;
    }

    const state = {
        isVisible: false,
        isRunning: false,
        isWon: false,
        idleTimeoutId: null,
        victoryTimeoutId: null,
        bulbTimeoutIds: []
    };

    function clearIdleTimer() {
        if (state.idleTimeoutId) {
            clearTimeout(state.idleTimeoutId);
            state.idleTimeoutId = null;
        }
    }

    function clearAnimationTimers() {
        if (state.victoryTimeoutId) {
            clearTimeout(state.victoryTimeoutId);
            state.victoryTimeoutId = null;
        }

        state.bulbTimeoutIds.forEach(timeoutId => clearTimeout(timeoutId));
        state.bulbTimeoutIds = [];
    }

    function resetStopGame() {
        clearIdleTimer();
        clearAnimationTimers();

        state.isRunning = false;
        if (state.isWon) {
            return;
        }

        bulbs.forEach(bulb => bulb.classList.remove('is-active'));
    }

    function showVictoryPopup() {
        state.isWon = true;
        state.isRunning = false;
        state.victoryTimeoutId = null;
        victoryPopup.classList.add('active');
    }

    function startCountdown() {
        if (state.isRunning || state.isWon || !state.isVisible) {
            return;
        }

        state.isRunning = true;
        clearIdleTimer();
        bulbs.forEach(bulb => bulb.classList.remove('is-active'));

        bulbs.forEach((bulb, index) => {
            const timeoutId = setTimeout(() => {
                bulb.classList.add('is-active');
            }, index * 2000);

            state.bulbTimeoutIds.push(timeoutId);
        });

        state.victoryTimeoutId = setTimeout(showVictoryPopup, 6000);
    }

    function armIdleDetection() {
        if (!state.isVisible || state.isRunning || state.isWon) {
            return;
        }

        clearIdleTimer();
        state.idleTimeoutId = setTimeout(startCountdown, 1500);
    }

    function handleScrollActivity() {
        if (!state.isVisible || state.isWon) {
            return;
        }

        if (state.isRunning) {
            resetStopGame();
        }

        armIdleDetection();
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target !== trafficLight) {
                return;
            }

            state.isVisible = entry.isIntersecting;
            stopTitle.classList.toggle('is-visible', entry.isIntersecting);

            if (entry.isIntersecting) {
                armIdleDetection();
                return;
            }

            clearIdleTimer();
        });
    }, {
        threshold: 0.45
    });

    observer.observe(trafficLight);
    window.addEventListener('scroll', handleScrollActivity, { passive: true });

    function resetStopPopupFlow() {
        victoryPopup.classList.remove('active');
        resetStopGame();

        if (state.isVisible && !state.isWon) {
            armIdleDetection();
        }
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', resetStopPopupFlow);
    }

    if (startAgainBtn) {
        startAgainBtn.addEventListener('click', resetStopPopupFlow);
    }

    victoryPopup.addEventListener('click', (e) => {
        if (e.target === victoryPopup) {
            resetStopPopupFlow();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const drinkSection = document.querySelector('.create_drink');
    const dialogueBox = document.querySelector('.create_drink_text');
    const dialogueText = document.querySelector('.create_drink_text_value');
    const dropZone = document.querySelector('.drink_drop_zone');
    const glassImage = document.querySelector('.empty_glass');
    const options = document.querySelectorAll('.drink_option');
    const againButton = document.querySelector('.again_button_create_drink');
    const confirmButton = document.querySelector('.done_button_create_drink');
    const victoryPopup = document.querySelector('.popup_searching_a_friend');
    const closePopupBtn = victoryPopup?.querySelector('.close_popup_button_searching_a_friend');
    const startAgainBtn = victoryPopup?.querySelector('.again_popup_button_searching_a_friend');

    if (!drinkSection || !dialogueBox || !dialogueText || !dropZone || !glassImage || !options.length || !againButton || !confirmButton || !victoryPopup) {
        return;
    }

    const itemSources = {};
    options.forEach(option => {
        const key = option.dataset.drinkItem;
        const image = option.querySelector('img');
        if (key && image) {
            itemSources[key] = image.getAttribute('src');
        }
    });

    const state = {
        typingIntervalId: null,
        dialoguePlayed: false,
        activeDrag: null,
        selectedBase: null,
        selectedDecor: null
    };

    const glassImages = {
        empty: 'images/empty_glass.svg',
        base_1: 'images/drink_1_base.svg',
        base_2: 'images/drink_2_base.svg',
        base_1__bake_drink_1: 'images/drink_1_base_1_decor.svg',
        base_1__bake_drink_1_1: 'images/drink_1_base_2_decor.svg',
        base_2__bake_drink_1: 'images/drink_2_base_1_decor.svg',
        base_2__bake_drink_1_1: 'images/drink_2_base_2_decor.svg'
    };

    function stopTyping() {
        if (state.typingIntervalId) {
            clearInterval(state.typingIntervalId);
            state.typingIntervalId = null;
        }
    }

    function getGlassImage(base, decor) {
        if (!base) {
            return glassImages.empty;
        }

        if (!decor) {
            return glassImages[base] || glassImages.empty;
        }

        return glassImages[`${base}__${decor}`] || glassImages[base] || glassImages.empty;
    }

    function updateGlassState(previewKey = null, animate = false) {
        let base = state.selectedBase;
        let decor = state.selectedDecor;

        if (previewKey) {
            if (previewKey.startsWith('base_')) {
                if (!base) {
                    base = previewKey;
                }
            } else if (base && !decor) {
                decor = previewKey;
            }
        }

        glassImage.src = getGlassImage(base, decor);
        glassImage.classList.toggle('is-previewing', Boolean(previewKey));

        if (animate) {
            glassImage.classList.remove('is-updating');
            void glassImage.offsetWidth;
            glassImage.classList.add('is-updating');
        }
    }

    function addDrinkItem(key) {
        if (!key || !itemSources[key]) {
            return;
        }

        if (key.startsWith('base_')) {
            if (state.selectedBase && state.selectedBase !== key) {
                updateGlassState();
                return;
            }

            state.selectedBase = state.selectedBase || key;
        } else {
            if (!state.selectedBase || state.selectedDecor) {
                updateGlassState();
                return;
            }

            state.selectedDecor = key;
        }

        updateGlassState(null, true);
    }

    function playDialogueAnimation(forceReplay = false) {
        if (!forceReplay && state.dialoguePlayed) {
            return;
        }

        state.dialoguePlayed = true;
        stopTyping();
        dialogueBox.classList.add('is-visible');

        const fullText = dialogueText.dataset.fullText || '';
        dialogueText.textContent = '';

        let index = 0;
        state.typingIntervalId = setInterval(() => {
            dialogueText.textContent = fullText.slice(0, index + 1);
            index += 1;

            if (index >= fullText.length) {
                stopTyping();
            }
        }, 45);
    }

    function resetDrinkSection(replayDialogue = false) {
        if (state.activeDrag) {
            state.activeDrag.proxy?.remove();
            state.activeDrag.option?.classList.remove('is-dragging');
            state.activeDrag = null;
        }

        state.selectedBase = null;
        state.selectedDecor = null;
        updateGlassState();
        dropZone.classList.remove('is-hovered');

        if (replayDialogue) {
            state.dialoguePlayed = false;
            dialogueBox.classList.remove('is-visible');
            dialogueText.textContent = '';
            requestAnimationFrame(() => playDialogueAnimation(true));
        }
    }

    function isPointInsideDropZone(clientX, clientY) {
        const rect = dropZone.getBoundingClientRect();

        return clientX >= rect.left &&
            clientX <= rect.right &&
            clientY >= rect.top &&
            clientY <= rect.bottom;
    }

    function updateDragProxyPosition(clientX, clientY) {
        if (!state.activeDrag?.proxy) {
            return;
        }

        state.activeDrag.proxy.style.left = `${clientX}px`;
        state.activeDrag.proxy.style.top = `${clientY}px`;
    }

    function finishPointerDrag(clientX, clientY) {
        if (!state.activeDrag) {
            return;
        }

        const { option, key, proxy, moved } = state.activeDrag;
        const droppedInGlass = isPointInsideDropZone(clientX, clientY);

        if (proxy) {
            proxy.remove();
        }

        option.classList.remove('is-dragging');
        dropZone.classList.remove('is-hovered');
        updateGlassState();

        if (droppedInGlass || !moved) {
            addDrinkItem(key);
        }

        state.activeDrag = null;
    }

    function handlePointerMove(event) {
        if (!state.activeDrag) {
            return;
        }

        const moveX = event.clientX - state.activeDrag.startX;
        const moveY = event.clientY - state.activeDrag.startY;
        const distance = Math.hypot(moveX, moveY);

        if (distance > 6) {
            state.activeDrag.moved = true;
        }

        updateDragProxyPosition(event.clientX, event.clientY);
        const isOverGlass = isPointInsideDropZone(event.clientX, event.clientY);
        dropZone.classList.toggle('is-hovered', isOverGlass);
        updateGlassState(isOverGlass ? state.activeDrag.key : null);
    }

    function handlePointerUp(event) {
        finishPointerDrag(event.clientX, event.clientY);
        document.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerup', handlePointerUp);
    }

    options.forEach(option => {
        option.setAttribute('draggable', 'false');

        option.addEventListener('pointerdown', (event) => {
            const key = option.dataset.drinkItem;
            if (!key) {
                return;
            }

            event.preventDefault();

            const proxy = option.cloneNode(true);
            proxy.classList.add('drink_option_drag_proxy');
            document.body.appendChild(proxy);

            state.activeDrag = {
                option,
                key,
                proxy,
                startX: event.clientX,
                startY: event.clientY,
                moved: false
            };

            option.classList.add('is-dragging');
            updateDragProxyPosition(event.clientX, event.clientY);

            document.addEventListener('pointermove', handlePointerMove);
            document.addEventListener('pointerup', handlePointerUp);
        });
    });

    againButton.addEventListener('click', () => {
        resetDrinkSection(true);
    });

    confirmButton.addEventListener('click', () => {
        victoryPopup.classList.add('active');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target === drinkSection && entry.intersectionRatio >= 0.95) {
                playDialogueAnimation();
            }
        });
    }, {
        threshold: [0.95, 1]
    });

    observer.observe(drinkSection);

    function handleDrinkPopupAgain() {
        victoryPopup.classList.remove('active');
        resetDrinkSection(true);
    }

    function closeDrinkPopupOnly() {
        victoryPopup.classList.remove('active');
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closeDrinkPopupOnly);
    }

    if (startAgainBtn) {
        startAgainBtn.addEventListener('click', handleDrinkPopupAgain);
    }

    victoryPopup.addEventListener('click', (event) => {
        if (event.target === victoryPopup) {
            closeDrinkPopupOnly();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const victorinaSection = document.querySelector('.victorina');
    const mainCharacter = document.querySelector('.main-character-img');
    const victorinaCharacter = document.querySelector('.victorina_main_character');
    const questionCard = document.querySelector('.victorina_card_question');
    const answerCards = Array.from(document.querySelectorAll('.victorina_card_answer'));
    const popup = document.querySelector('.popup_victorina');
    const popupTitle = document.querySelector('.popup_victorina_title');
    const popupScore = document.querySelector('.popup_victorina_score');
    const popupClose = document.querySelector('.close_popup_button_victorina');
    const popupAgain = document.querySelector('.again_popup_button_victorina');

    if (!victorinaSection || !mainCharacter || !victorinaCharacter || !questionCard || answerCards.length !== 3 || !popup || !popupTitle || !popupScore || !popupClose || !popupAgain) {
        return;
    }

    const rounds = [
        {
            question: '��� ����� ������� ��� ����������?',
            answers: ['������!', '�� � ��� � ����', '�� ���� ��������'],
            correctIndex: 0
        },
        {
            question: '��� �������� ���������� ��������?',
            answers: ['������� ��� �������', '������ ������', '�����������'],
            correctIndex: 1
        },
        {
            question: '��� ���������� �����?',
            answers: ['���������� ��� ���', '�������� ���', '������� ���-�� ������'],
            correctIndex: 2
        }
    ];

    const state = {
        started: false,
        roundIndex: 0,
        correctAnswers: 0,
        isLocked: false,
        isFinished: false
    };

    function syncVictorinaCharacter() {
        victorinaCharacter.src = mainCharacter.getAttribute('src') || 'images/1_1_1_variant.svg';
    }

    function setCardText(card, text) {
        const textNode = card.querySelector('.victorina_card_text');
        if (textNode) {
            textNode.textContent = text;
        }
    }

    function setInitialVictorinaState() {
        victorinaSection.classList.remove('is-started', 'is-finished');
        state.started = false;
        state.roundIndex = 0;
        state.correctAnswers = 0;
        state.isLocked = false;
        state.isFinished = false;

        setCardText(questionCard, '?');
        answerCards.forEach(card => {
            card.classList.remove('is-selected');
            setCardText(card, '?');
        });

        popup.classList.remove('active');
        syncVictorinaCharacter();
    }

    function renderRound() {
        const round = rounds[state.roundIndex];
        if (!round) {
            return;
        }

        victorinaSection.classList.add('is-started');
        setCardText(questionCard, round.question);

        answerCards.forEach((card, index) => {
            card.classList.remove('is-selected');
            setCardText(card, round.answers[index]);
        });
    }

    function showResultPopup() {
        popup.classList.add('active');
        const scoreText = `���������� �������: ${state.correctAnswers} �� 3`;

        if (state.correctAnswers === 3) {
            popupTitle.textContent = '�� �������!';
            popupScore.textContent = scoreText;
        } else {
            popupTitle.textContent = '�� �� ������ ��������';
            popupScore.textContent = scoreText;
        }
    }

    function finishVictorina() {
        state.isFinished = true;
        state.isLocked = false;
        victorinaSection.classList.add('is-finished');
        showResultPopup();
    }

    function startVictorina() {
        if (state.started) {
            return;
        }

        state.started = true;
        renderRound();
    }

    function handleAnswer(cardIndex) {
        if (!state.started || state.isLocked || state.isFinished) {
            return;
        }

        const round = rounds[state.roundIndex];
        if (!round) {
            return;
        }

        state.isLocked = true;
        const selectedCard = answerCards[cardIndex];
        selectedCard?.classList.add('is-selected');

        if (cardIndex === round.correctIndex) {
            state.correctAnswers += 1;
        }

        setTimeout(() => {
            state.roundIndex += 1;

            if (state.roundIndex >= rounds.length) {
                finishVictorina();
                return;
            }

            state.isLocked = false;
            renderRound();
        }, 420);
    }

    questionCard.addEventListener('click', () => {
        startVictorina();
    });

    answerCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            if (!state.started) {
                startVictorina();
                return;
            }

            handleAnswer(index);
        });
    });

    popupClose.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    popupAgain.addEventListener('click', () => {
        setInitialVictorinaState();
    });

    popup.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.classList.remove('active');
        }
    });

    setInitialVictorinaState();
});

