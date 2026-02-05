
export interface VATResult {
  baseAmount: number;
  vatAmount: number;
  totalAmount: number;
}

export interface TRNValidationResult {
  isValid: boolean;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
