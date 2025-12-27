export interface FinancialData {
  currentAssets: {
    prev: {
      cash: number;
      receivables: number;
      inventory: number;
      securities: number;
      shortTermLoans: number;
      deferredTaxAssets: number;
      otherCurrentAssets: number;
    };
    current: {
      cash: number;
      receivables: number;
      inventory: number;
      securities: number;
      shortTermLoans: number;
      deferredTaxAssets: number;
      otherCurrentAssets: number;
    };
  };
  fixedAssets: {
    prev: {
      tangibleAssets: number;
      intangibleAssets: number;
      investmentSecurities: number;
      longTermLoans: number;
      deferredTaxAssets: number;
      otherFixedAssets: number;
    };
    current: {
      tangibleAssets: number;
      intangibleAssets: number;
      investmentSecurities: number;
      longTermLoans: number;
      deferredTaxAssets: number;
      otherFixedAssets: number;
    };
  };
  deferredAssets: {
    prev: { deferredAssets: number };
    current: { deferredAssets: number };
  };
  currentLiabilities: {
    prev: {
      accountsPayable: number;
      shortTermBorrowings: number;
      incomeTaxPayable: number;
      deferredTaxLiabilities: number;
      bonusReserve: number;
      retirementBenefits: number;
      otherCurrentLiabilities: number;
    };
    current: {
      accountsPayable: number;
      shortTermBorrowings: number;
      incomeTaxPayable: number;
      deferredTaxLiabilities: number;
      bonusReserve: number;
      retirementBenefits: number;
      otherCurrentLiabilities: number;
    };
  };
  fixedLiabilities: {
    prev: {
      longTermBorrowings: number;
      deferredTaxLiabilities: number;
      retirementBenefits: number;
      otherFixedLiabilities: number;
    };
    current: {
      longTermBorrowings: number;
      deferredTaxLiabilities: number;
      retirementBenefits: number;
      otherFixedLiabilities: number;
    };
  };
  equity: {
    prev: {
      capitalStock: number;
      retainedEarnings: number;
      treasuryStock: number;
    };
    current: {
      capitalStock: number;
      retainedEarnings: number;
      treasuryStock: number;
    };
  };
  incomeStatement: {
    pretaxIncome: number;
    netIncome: number;
    depreciation: number;
    interestIncome: number;
    interestExpense: number;
    securitiesGain: number;
    securitiesLoss: number;
    fixedAssetGain: number;
    fixedAssetLoss: number;
  };
  appropriation: {
    dividends: number;
    executiveBonuses: number;
  };
}
