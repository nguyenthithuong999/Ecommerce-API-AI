import { test, expect } from '@fixtures';
import path from 'path';
import fs from 'fs';

test.describe('Contact Us UI Suite', () => {
  test('Submit Contact Us Form successfully', {
    tag: ['@TC_UI_10', '@MOD_CONTACT_UI', '@smoke'],
  }, async ({ conf, contactPage }) => {
    const { name, email, subject, message, fileContent, expectedSuccessAlert } = conf.caseData;

    // 1. Prepare sample dummy file to upload
    const dummyFilePath = path.resolve(process.cwd(), 'sample-upload.txt');
    if (!fs.existsSync(dummyFilePath)) {
      fs.writeFileSync(dummyFilePath, fileContent);
    }

    // 2. Navigate to Contact Us page
    await contactPage.navigate();
    await contactPage.verifyContactPageVisible();

    // 3. Fill and submit form
    await contactPage.fillContactForm({ name, email, subject, message, filePath: dummyFilePath });
    await contactPage.submitForm();

    // 4. Verify success message
    await contactPage.verifySuccessMessage(expectedSuccessAlert);

    // Clean up sample file
    if (fs.existsSync(dummyFilePath)) {
      fs.unlinkSync(dummyFilePath);
    }
  });
});
