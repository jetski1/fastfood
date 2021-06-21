const products = [{
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 1500,
        amount: 0,

        /* Геттеры */
        get Summ() {
            /*Отдает кол-во умноженно на цену */
            return this.price * this.amount
        },
        get Kcall() {
            /*Отдает кол-во умноженно на каллории */
            return this.kcall * this.amount
        }
    },
    {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 1400,
        amount: 0,

        /* Геттеры */
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    {
        name: 'FRESH COMBO ',
        price: 31900,
        kcall: 2300,
        amount: 0,

        /* Геттеры */
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
]


const extraProducts = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 2000,
        kcall: 200
    },
    lettuce: {
        name: 'Салатный лист',
        price: 1000,
        kcall: 10
    },
    cheese: {
        name: 'Сыр',
        price: 2500,
        kcall: 150
    }
}


const divProduct            = [...document.querySelectorAll('.main__product')],
    btnPlusOrMinus          = [...document.querySelectorAll('.main__product-btn')],
    checkExtraProducts      = [...document.querySelectorAll('.main__product-checkbox')],
    addCart                 = document.querySelector('.addCart'),
    receipt                 = document.querySelector('.receipt'),
    receiptOut              = document.querySelector('.receipt__window-out'),
    receiptWindow           = document.querySelector('.receipt__window'),
    btnRestart              = document.querySelector('.receipt__window-btn')

btnPlusOrMinus.forEach(plusOrMinus => {
    plusOrMinus.addEventListener('click', PlurOrMinus)
})




function PlurOrMinus() {
    /* 
    
    closest() - Это метод объекта document который подключается к ближайшему родительскому элементу по селектору 
    getAttribut() - это метод объекта document который получает данные из аттирибута элемента
    */
    const parent = this.closest('.main__product'),
        parentIndex = divProduct.indexOf(parent),
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        btnSymbol = this.getAttribute('data-symbol')

    if (btnSymbol === '+' && products[parentIndex].amount < 12)
        products[parentIndex].amount++
    else if (btnSymbol === '-' && products[parentIndex].amount > 0)
        products[parentIndex].amount--

    const {
        amount,
        Summ,
        Kcall
    } = products[parentIndex]
    console.log(amount, Summ, Kcall);
    out.innerHTML = amount
    price.innerHTML = Summ.toLocaleString()
    kcall.innerHTML = Kcall.toLocaleString()
}


/* *************************** CHECKBOXES *******************************     */


checkExtraProducts.forEach(checkbox => {
    checkbox.addEventListener('click', addExtraProduct)
})



function addExtraProduct() {
    const parent = this.closest('.main__product'),
        parentIndex = divProduct.indexOf(parent),
        elAttr = this.getAttribute('data-extra'),
        kcall = parent.querySelector('.main__product-kcall span'),
        price = parent.querySelector('.main__product-price span ')
    const checked = products[parentIndex][elAttr] = this.checked

    if (checked) {
        products[parentIndex].kcall += extraProducts[elAttr].kcall
        products[parentIndex].price += extraProducts[elAttr].price
    } else {
        products[parentIndex].kcall -= extraProducts[elAttr].kcall
        products[parentIndex].price -= extraProducts[elAttr].price
    }
    const {
        Kcall,
        Summ
    } = products[parentIndex]

    kcall.innerHTML = Kcall.toLocaleString()
    price.innerHTML = Summ.toLocaleString()

}


/*         Check            */

const cartProducts = []
let totalName      = '',
    totalPrice     = 0 ,
    totalKcall     = 0


addCart.addEventListener('click', function () {
    products.forEach(burger => {
        if (burger.amount) {
            cartProducts.push(burger)
            burger.name += `\nКол-вo: ${burger.amount}`
            for(const keyBurger in burger){
                if (burger[keyBurger]  === true ) {
                    burger.name += `\n${extraProducts[keyBurger].name}`
                }
            }
        }
        burger.price = burger.Summ
        burger.kcall = burger.Kcall
    })
    
    cartProducts.forEach(burger => {
        totalName  += `\n${burger.name}\n`
        totalKcall += burger.kcall
        totalPrice += burger.price
    })
    receiptOut.innerHTML = `Вы купили: \n${totalName}\nКаллорийность: ${totalKcall.toLocaleString()}\nСтоимость: ${
        totalPrice.toLocaleString()}\nАдрес доставки: Узбекистан, Ташкент, Чиланзар, кв-л Бунёдкор "Ц", 7 `
        receipt.style.display = 'flex'
        setTimeout(() => {
            receipt.style.opacity = '1'
        }, 100 );
        setTimeout(() => {
            receiptWindow.style.top = '0'
        }, 200);
})

btnRestart.addEventListener('click',  function () {
    window.location.reload()
})

// DZ ↓
const timerHTML = document.querySelector('.header__timer-extra')

function timer(i = 0) {
    timerHTML.innerHTML = i
    let time = 50
    if(i > 50 && i < 75) time = 100
    else if(i >= 75 && i < 90) time = 200
    else if(i >= 90 && i < 95) time = 300
    else if(i >= 95 && i <= 100) time = 400

    if(i < 100) {
        i++
        setTimeout(() => timer(i), time)
    }
}
timer()