interface Rule {
  type: 'required' | 'length';
}

interface Require extends Rule {
  type: 'required';
}

interface Length extends Rule {
  type: 'length';
  options: LengthOptions;
}

interface LengthOptions {
  min: number;
  max: number;
}

export interface Status {
  valid: boolean;
  message?: string;
}

type Validator = Require | Length;

export const required = (): Require => {
  return { type: 'required' };
};

export const length = (options: LengthOptions): Length => {
  return { type: 'length', options };
};

export const validate = (value: string, validators: Validator[]): Status => {
  for (const validator of validators) {
    if (validator.type === 'required' && (!value || value.length === 0)) {
      return { valid: false, message: 'The value is required' };
    }

    if (validator.type === 'length') {
      const { min, max } = validator.options;
      if (value.length < min || value.length > max) {
        return { valid: false, message: `Value must be between ${min} and ${max} characters` };
      }
    }
  }

  return { valid: true };
};
