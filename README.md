<h1>PROFORMA <span style="color: blue;">INVOICE</span> CALCULATOR</h1>
    <h6 style="color: blue;">version 2.0.0</h6>

<h1 align="center">
<a href="https://github.com/Sidodus/Sidodus-proforma-invoice-calculator/blob/master/screenshot/sido1.png" style="margin-right: 5px"><img src="./screenshot/sido1.png" alt='Screenshot 1' width="150"/></a>
<a href="./screenshot/sido2.png" style="margin-right: 5px"><img src="./screenshot/sido2.png" alt='Screenshot 1'alt='Screenshot 2' width="150"/></a>
<a href="./screenshot/sido3.png" style="margin-right: 5px"><img src="./screenshot/sido3.png" alt='Screenshot 3' width="150"/></a>
</h1>

<blockquote align="center">
    <em>Proforma Invoice Calculator</em> is an invoice calculator which
    calculates how much should be charged per project in just 2 STEPS
 </blockquote>

<h4>UPDATE</h4>
<h6 style="color: blue;">Version: 2.0.0</h6>

<ol type="i">
  <li>Perfect calculation algorithm.</li>
    <li>Now users can set, or change exchange rate values at any time.</li>
    <li>While changing the exchange rate, users would a BASE Currency.</li>
    <ul>
      <li>
        A Base Currency is the constant currency in which the second currency would be recalculated from.
      </li>
      <li>
        <div>e.g.</div>
        <b>Original FX Ratio = 1:365 </b> <br />
        1 Pack of pencil @ Original FX Ratio = <code>$1 to ₦365</code> <br />
        <b>
          If Base Currency = <span style="color: blue;">Dollar</span> && New FX Ratio = <code>1:400</code>
        </b>
        <br />
        1 Pack of pencil @ New FX Ratio = <code>$1 to ₦400</code> <br />
        <b>
          If Base Currency = <span style="color: blue;">Naira</span> && New FX Ratio = <code>1:400</code>
        </b>
        <br />
        1 Pack of pencil @ New FX Ratio = <code>$0.91 to ₦365</code> <br />
      </li>
    </ul>
      <li>
      Testing proforma invoice with different exchange rate values is now possible after haven calculated proforma invoice
      <ul>
        <li>
          You Would get Your Expenses Values & A NEW Proforma Invoice Based On Your New Exchange Rate
        </li>
      </ul>
    </li>
     <li>
      Improved background calculation algorithm to MAXIMUM Calculated Decimal numbers instead of the previous 5 decimal place.
      <ul>
        <li>
          <div>e.g.</div>
          <code>7 / 365 = 0.01917808219178082192, Instead of 0.01918</code>
        </li>
      </ul>
    </li>
    <li>Improved User Experience</li>
</ol>

<h4>UPDATE</h4>
<h6 style="color: blue;">Version: 1.1.0</h6>

- \*). Improved calculation algorithm
- \*). Changed background calculation algorithm to 5 decimal numbers instead of the initial 2 decimal. e.g. 38.27448 instead of 38.27
- \*). Number output is still in 2 decimal place but with better accuracy. e.g. ₦38.28 instead of ₦38.27

  # USAGE...

  # Calculate Your Invoice In 2 Steps

- 1). Input All Expenses Through Step 1
- 2). Input The Invoice Details In Step 2
- 3). That's all & You See The Magic.
- \*). Application Is Optimized With Nigerian Naira ([NGN] ₦) & US Dollar ([USD] \$)
- \*). Users Can Also Set An Exchange Rate Value Between NGN & USD (default exchange rate is set at ₦365 to \$1)

See Proforma Invoice Calculator At Work Here [Proforma Invoice Calculator](https://sidodus.github.io/Sidodus-proforma-invoice-calculator/)

<h6>Created With React.js & Redux State Management</h6>

> Proforma Invoice Calculator is Developed By Saheed Odulaja During A React / Redux Practice .
> Feel Free To Fork This Repository as There Is Always Room For Improvement.
> Also Be Kind Enough To Leave A STAR As A Mark Of Encouragement :)
