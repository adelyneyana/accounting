from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # To handle Cross-Origin requests from your React frontend

@app.route('/api/calculate', methods=['POST'])
def calculate_vat():
    # Extracting data from the POST request
    data = request.get_json()
    sales = float(data.get('sales', 0))
    purchases = float(data.get('purchases', 0))
    vat_rate = float(data.get('vatRate', 0)) / 100  # Convert percentage to decimal
    vat_payable = None

    # Calculate Output VAT (VAT on Sales) and Input VAT (VAT on Purchases)
    output_vat = sales * vat_rate
    input_vat = purchases * vat_rate

    # Scenario A: Both Sales and Purchases are provided, calculate VAT Payable
    if sales > 0 and purchases > 0:
        vat_payable = output_vat - input_vat

    # Scenario B: Sales and VAT Payable are provided, calculate Purchases
    elif sales > 0 and 'vatPayable' in data:
        vat_payable = float(data['vatPayable'])
        input_vat = output_vat - vat_payable
        purchases = input_vat / vat_rate

    # Scenario C: Purchases and VAT Payable are provided, calculate Sales
    elif purchases > 0 and 'vatPayable' in data:
        vat_payable = float(data['vatPayable'])
        output_vat = vat_payable + input_vat
        sales = output_vat / vat_rate

    # Return the results as a JSON response
    return jsonify({
        "sales": round(sales, 2),
        "purchases": round(purchases, 2),
        "outputVAT": round(output_vat, 2),
        "inputVAT": round(input_vat, 2),
        "vatPayable": round(vat_payable, 2) if vat_payable is not None else None
    })

if __name__ == '__main__':
    app.run(debug=True)
