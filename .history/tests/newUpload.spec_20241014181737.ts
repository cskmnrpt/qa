import { test, expect } from '../utils/fixtures';
import { UploadPage } from '../pages/uploadPage';
import { testData } from '../data/testData';
import { qase } from 'playwright-qase-reporter';

test.describe('New Upload', () => {
  let uploadPage: UploadPage;

  test.beforeEach(async ({ loggedInPage }) => {
    uploadPage = new UploadPage(loggedInPage); // Use the logged-in page
    await uploadPage.navigateToUploadSection(); // Navigate to the upload section
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({ path: `screenshots/${testInfo.title}.png` });
    }
  });

  test('Upload a file successfully [Qase ID: RDM-7]', async () => {
    // Fill in the record details
    await uploadPage.fillTitle(testData.upload.recordTitle());
    await uploadPage.fillFamilyName(testData.upload.familyName());
    await uploadPage.selectDOIOption(true); // Adjust this based on your test needs
    await uploadPage.selectResourceType();

    // Upload a file
    await uploadPage.uploadRandomFile();

    // Click the Publish button
    await uploadPage.clickPublish();

    // Click the Publish button on the confirmation dialog
    await uploadPage.clickPublishOnConfirmation();

    // Check the title of the new created record in the detail
    const recordExists = await uploadPage.checkRecordExists();
    expect(recordExists).toBe(true); // Assert that the record exists

   // await uploadPage.waitForFiveSeconds(); // Waiting 5s during debug
  });
});