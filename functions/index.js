const admin = require('firebase-admin');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

admin.initializeApp();

function requireAuth(request) {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication required.');
  }
}

function requireSuperAdmin(request) {
  requireAuth(request);
  const token = request.auth.token || {};
  if (token.super_admin !== true) {
    throw new HttpsError('permission-denied', 'Super admin permission required.');
  }
}

const allowedOrigins = [
  'https://conference.ugandaavocados.org',
  'http://localhost',
  'http://127.0.0.1'
];

exports.bootstrapSuperAdmin = onCall({ cors: allowedOrigins }, async (request) => {
  requireAuth(request);

  const email = (request.auth.token && request.auth.token.email) || '';
  const allowed = ['barasagodwil@gmail.com'];

  if (!allowed.includes(email)) {
    throw new HttpsError('permission-denied', 'You are not allowed to bootstrap super admin.');
  }

  await admin.auth().setCustomUserClaims(request.auth.uid, {
    super_admin: true,
    permissions: {
      manage_admins: true,
      view_registrations: true,
      export_registrations: true,
      view_inquiries: true,
      manage_email_campaigns: true,
      manage_templates: true,
      view_subscribers: true,
      export_subscribers: true,
      manage_settings: true
    }
  });

  await admin.firestore().doc(`adminUsers/${request.auth.uid}`).set(
    {
      email,
      displayName: request.auth.token.name || '',
      roleLabel: 'Super Admin',
      super_admin: true,
      permissions: {
        manage_admins: true,
        view_registrations: true,
        export_registrations: true,
        view_inquiries: true,
        manage_email_campaigns: true,
        manage_templates: true,
        view_subscribers: true,
        export_subscribers: true,
        manage_settings: true
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  return { ok: true };
});

exports.createAdminUser = onCall({ cors: allowedOrigins }, async (request) => {
  requireSuperAdmin(request);

  const data = request.data || {};
  const email = (data.email || '').toString().trim().toLowerCase();
  const displayName = (data.displayName || '').toString().trim();
  const permissions = data.permissions && typeof data.permissions === 'object' ? data.permissions : {};
  const continueUrl = (data.continueUrl || '').toString().trim();

  if (!email) throw new HttpsError('invalid-argument', 'Email is required.');

  let userRecord;
  try {
    userRecord = await admin.auth().getUserByEmail(email);
  } catch (e) {
    userRecord = await admin.auth().createUser({
      email,
      emailVerified: false,
      displayName: displayName || undefined,
      disabled: false
    });
  }

  await admin.auth().setCustomUserClaims(userRecord.uid, {
    super_admin: false,
    permissions
  });

  await admin.firestore().doc(`adminUsers/${userRecord.uid}`).set(
    {
      email,
      displayName: displayName || '',
      roleLabel: data.roleLabel || 'Admin',
      super_admin: false,
      permissions,
      createdBy: request.auth.uid,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    },
    { merge: true }
  );

  const link = await admin.auth().generatePasswordResetLink(email, continueUrl ? { url: continueUrl } : undefined);

  return {
    ok: true,
    uid: userRecord.uid,
    email,
    passwordResetLink: link
  };
});
