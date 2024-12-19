import { test, expect } from '@playwright/test';

const APP_URL = 'http://localhost';
const LOGIN_URL = `${APP_URL}/login`;
const REGISTER_URL = `${APP_URL}/register`;
const PROFILE_URL = `${APP_URL}/profile`;

const DEFAULT_TIMEOUT = 10_000; // ms

type User = {
  readonly email: string;
  readonly username: string;
  readonly password: string;
};

const primaryUser: User = {
  email: 'e2e-test-1@email.com',
  username: 'e2e-test-1',
  password: 'e2e-test-1',
};

const secondaryUser: User = {
  email: 'e2e-test-2@email.com',
  username: 'e2e-test-2',
  password: 'e2e-test-2',
};

async function registerUser(page, user: User, timeout = DEFAULT_TIMEOUT) {
  await page.goto(REGISTER_URL);
  await page.fill('input[name="username"]', user.username);
  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', user.password);

  const button = page.locator('button', { hasText: 'Register' });
  await button.click();

  await page.waitForURL(LOGIN_URL, { timeout });
}

async function loginUser(page, user: User, timeout = DEFAULT_TIMEOUT) {
  await page.goto(LOGIN_URL);
  await page.fill('input[name="loginEmail"]', user.email);
  await page.fill('input[name="loginPassword"]', user.password);

  const button = page.locator('button', { hasText: 'Login' });
  await button.click();

  await page.waitForURL(PROFILE_URL, { timeout });
}

async function publishPublicPost(page, content: string) {
    await page.goto(PROFILE_URL);
    await page.fill('textarea[name="content"]', content);
    const button = page.locator('button', { hasText: 'Publish' });
    await button.click();
}

async function publishFriendsOnlyPost(page, content: string) {
    await page.goto(PROFILE_URL);
    await page.fill('textarea[name="content"]', content);
    await page.selectOption('select[name="privacy"]', { label: 'friends' });
    const button = page.locator('button', { hasText: 'Publish' });
    await button.click();
}

test.describe('Bunnybook E2E tests', () => {
  test('User can register to the application', async ({ page }) => {
    await registerUser(page, primaryUser);

    // Assert that user is redirected to login after successful registration.
    await expect(page).toHaveURL(LOGIN_URL);
  });

  test('User can log in to the application', async ({ page }) => {
    await loginUser(page, primaryUser);

    // Assert that user is redirected to their profile after successful login.
    await expect(page).toHaveURL(PROFILE_URL);
  });

  test('Logged-in user can log out from the application', async ({ page }) => {
    await loginUser(page, primaryUser);

    const button = page.locator('button', { hasText: 'Log out' });
    await button.click();

    // Assert that user is redirected to login page after successful logout.
    await expect(page).toHaveURL(LOGIN_URL);

    // Assert that profile page is unaccessible after logout.
    // The app redirects to /404 if profile cannot be accessed.
    await page.goto(PROFILE_URL);
    await expect(page).toHaveURL(`${APP_URL}/404`, { timeout: DEFAULT_TIMEOUT });
  });

  test('Logged-in user can create a public post', async ({ page }) => {
    await loginUser(page, primaryUser);

    const postContent = 'Test public post';
    await publishPublicPost(page, postContent);

    const post = page.locator('div.post-content', { hasText: postContent });
    await expect(post).toBeVisible();

    const publicIcon = page.locator('p > i.fa-globe');
    await expect(publicIcon).toBeVisible();
  });

  test('Logged-in user can create a friends-only post', async ({ page }) => {
    await loginUser(page, primaryUser);

    const postContent = 'Test friends-only post';
    await publishFriendsOnlyPost(page, postContent);

    const post = page.locator('div.post-content', { hasText: postContent });
    await expect(post).toBeVisible();

    const friendsIcon = page.locator('p > i.fa-user-friends');
    await expect(friendsIcon).toBeVisible();
  });

  test('Logged-in user can delete their own post', async ({ page }) => {
    await registerUser(page, secondaryUser)
    await loginUser(page, secondaryUser);

    const postContent = 'Post';
    await publishPublicPost(page, postContent);

    // Deletion throws up an alert prompt. Accept deletion.
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });

    const button = page.locator('button.delete');
    button.waitFor({ state: "visible", timeout: DEFAULT_TIMEOUT });
    await expect(button).toBeEnabled({ timeout: DEFAULT_TIMEOUT });
    await button.click();

    const post = page.locator('div.post-content', { hasText: postContent });
    await expect(post).not.toBeVisible();
  });
});