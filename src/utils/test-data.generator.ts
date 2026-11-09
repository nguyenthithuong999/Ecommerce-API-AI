export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  title?: 'Mr' | 'Mrs';
  birth_date?: string;
  birth_month?: string;
  birth_year?: string;
  firstname: string;
  lastname: string;
  company?: string;
  address1: string;
  address2?: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export class TestDataGenerator {
  public static generateUniqueUser(prefix = 'qa_auto'): RegisterUserData {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    return {
      name: `User_${timestamp}`,
      email: `${prefix}_${timestamp}_${randomSuffix}@automationtest.com`,
      password: 'Password123!',
      title: 'Mr',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1995',
      firstname: 'Automation',
      lastname: 'Tester',
      company: 'QA Enterprise',
      address1: '456 Automation Way',
      address2: 'Suite 200',
      country: 'United States',
      zipcode: '90210',
      state: 'California',
      city: 'Beverly Hills',
      mobile_number: '+13105551234',
    };
  }
}

