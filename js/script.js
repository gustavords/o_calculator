function calculate ( a, b, operation )
{
    let arithmetics = {
        add: () => { return a + b },
        sub: () => { return a - b },
        mul: () => { return a * b },
        div: () => { return a / b },
    }

    let calculation = ``;
    switch ( operation )
    {
        case `+`:
            calculation = arithmetics.add();
            break;
        case `-`:
            calculation = arithmetics.sub();
            break;
        case `*`:
            calculation = arithmetics.mul();
            break;
        case `/`:
            calculation = arithmetics.div();
            break;
    }
    return calculation;
}

let memory = {
    pre: ``,
    curr: ``,
    opr: ``,
}

function displayNumber ()
{
    const numbers = document.querySelectorAll( `.number` );
    const calc_display = document.querySelector( `.calc_display` );

    numbers.forEach( ( number ) =>
    {
        number.addEventListener( `click`, ( e ) =>
        {
            if ( calc_display.textContent !== `` && memory.pre === memory.curr )
            {
                // clears after calculate()
                memory.pre = calc_display.textContent;
                memory.curr = ``;
                calc_display.textContent = ``;
            }
            calc_display.textContent += e.target.value;
            memory.curr = calc_display.textContent; //saves into memory
        } )
    } );
}


function clear ()
{
    const calc_display = document.querySelector( `.calc_display` );
    calc_display.textContent = ``;
    memory.pre = ``;
    memory.curr = ``;
    memory.opr = ``;
}


function processInput ()
{
    const cal_btns = document.querySelectorAll( `.cal_btn` );
    const calc_display = document.querySelector( `.calc_display` );

    cal_btns.forEach( ( button ) =>
    {
        button.addEventListener( `click`, ( e ) =>
        {
            //for operators
            if ( e.target.value === `+` || e.target.value === `-` || e.target.value === `*` || e.target.value === `/` )
            {

                //if operator pressed without new values, cancel button press
                if ( calc_display.textContent !== `` && memory.pre === memory.curr ) return;

                calc_display.textContent = ``;

                if ( memory.pre === `` )//memory not loaded
                {
                    memory.pre = memory.curr;
                    memory.curr = ``;
                }
                if ( memory.pre !== `` && memory.curr !== `` ) //memory loaded
                {
                    calc_display.textContent = calculate( +memory.pre, +memory.curr, memory.opr );
                    memory.pre = memory.curr;
                }

                memory.opr = e.target.value;
            }
            //for equals button
            if ( e.target.value === `=` && memory.pre !== `` && memory.curr !== `` && memory.opr !== `` )
            {
                calc_display.textContent = calculate( +memory.pre, +memory.curr, memory.opr );
            }
            //for clear btn
            if ( e.target.value === `clr` )
            {
                calc_display.textContent = ``;
            }
            //for all clear btn
            if ( e.target.value === `ac` )
            {
                clear();
            }

        } );
    } );

}

displayNumber();
processInput();