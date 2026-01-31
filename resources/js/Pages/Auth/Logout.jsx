import { router } from '@inertiajs/react';

export default function LogoutButton() {
  console.log('LogoutButton rendered');
  function logout() {
    router.post('/logout');
  }

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}