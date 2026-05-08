const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const converterForm = document.getElementById('converter-form');
const resultContainer = document.getElementById('result-container');
const finalResult = document.getElementById('final-result');
const conversionText = document.getElementById('conversion-text');
const swapBtn = document.getElementById('swap-btn');
const loadingState = document.getElementById('loading-state');

const currencies = {
    "USD": "US Dollar",
    "INR": "Indian Rupee",
    "EUR": "Euro",
    "GBP": "British Pound",
    "JPY": "Japanese Yen",
    "CAD": "Canadian Dollar",
    "AUD": "Australian Dollar",
    "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan",
    "SGD": "Singapore Dollar",
    "NZD": "New Zealand Dollar",
    "ZAR": "South African Rand",
    "AED": "UAE Dirham",
    "BRL": "Brazilian Real",
    "RUB": "Russian Ruble",
    "KRW": "South Korean Won",
    "MXN": "Mexican Peso",
    "IDR": "Indonesian Rupiah",
    "TRY": "Turkish Lira",
    "SAR": "Saudi Riyal",
    "SEK": "Swedish Krona",
    "NOK": "Norwegian Krone",
    "DKK": "Danish Krone",
    "PLN": "Polish Zloty",
    "THB": "Thai Baht",
    "MYR": "Malaysian Ringgit"
};

function populateDropdowns() {
    for (const [code, name] of Object.entries(currencies)) {
        const displayText = `${code} - ${name}`;

        const option1 = document.createElement('option');
        option1.value = code;
        option1.text = displayText;
        fromCurrencySelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = code;
        option2.text = displayText;
        toCurrencySelect.appendChild(option2);
    }

    fromCurrencySelect.value = "USD";
    toCurrencySelect.value = "INR";
}

async function convertCurrency(e) {
    if (e) e.preventDefault();

    const amount = amountInput.value;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (amount === "" || amount <= 0) return;

    resultContainer.classList.add('hidden');
    resultContainer.classList.remove('animate-pop');
    loadingState.classList.remove('hidden');

    try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
        const data = await response.json();

        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        conversionText.innerText = `${amount} ${fromCurrency} =`;
        finalResult.innerText = `${convertedAmount} ${toCurrency}`;

        loadingState.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        void resultContainer.offsetWidth;
        resultContainer.classList.add('animate-pop');

    } catch (error) {
        console.error("Error fetching exchange rates:", error);
        loadingState.classList.add('hidden');
        alert("Failed to fetch exchange rates. Please check your connection.");
    }
}

swapBtn.addEventListener('click', () => {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;

    if (amountInput.value > 0) {
        convertCurrency();
    }
});

converterForm.addEventListener('submit', convertCurrency);

populateDropdowns();