# Manpower Agency App - Interface Design

## Design Philosophy

This mobile app follows **Apple Human Interface Guidelines (HIG)** and is optimized for **portrait orientation (9:16)** with **one-handed usage** in mind. The design prioritizes clarity, efficiency, and role-based workflows for workers, supervisors, clients, and admins.

---

## Screen List

### Worker App (Primary Focus)

1. **Authentication Screens**
   - Login/OTP Screen
   - Registration Screen
   - Profile Completion Screen

2. **Home Screen (Worker Dashboard)**
   - Current shift status
   - Today's attendance status
   - Quick action buttons (Check-in, Check-out)
   - Upcoming shifts
   - Notifications badge

3. **Attendance Screen**
   - GPS-based check-in/check-out
   - Location map view
   - Attendance history
   - Manual attendance requests

4. **Shift & Deployment Screen**
   - Assigned shifts (calendar view)
   - Shift details (time, location, supervisor)
   - Accept/Reject shift
   - Deployment status

5. **Salary & Payroll Screen**
   - Current month earnings
   - Salary breakdown (base, overtime, deductions)
   - Payment history
   - Download payslip

6. **Documents Screen**
   - Aadhaar upload/verification
   - Passport upload/verification
   - Visa expiry alerts (for overseas workers)
   - Document status badges

7. **Uniform & Equipment Screen**
   - Issued items list
   - Return/damage requests
   - Equipment tracking

8. **Notifications Screen**
   - Push notifications
   - Announcements
   - Shift reminders
   - Approval requests

9. **Profile Screen**
   - Worker details
   - Contact information
   - Emergency contacts
   - Settings (language, notifications, logout)

### Supervisor/Admin App

1. **Dashboard Screen**
   - Real-time deployment map
   - Worker shortage alerts
   - Attendance overview (today)
   - Revenue dashboard

2. **Worker Management Screen**
   - Worker list with search/filter
   - Worker details and approval
   - Attendance approval
   - Deployment assignment

3. **Attendance Approval Screen**
   - Pending attendance requests
   - GPS verification
   - Approve/Reject buttons

4. **Shift Assignment Screen**
   - Available workers
   - Shift details form
   - Bulk assignment
   - Deployment confirmation

5. **Reports Screen**
   - Attendance analytics
   - Payroll reports
   - Revenue reports
   - Export to PDF/Excel

### Client Portal (Web-First, Mobile Secondary)

1. **Login Screen**
   - Company credentials
   - OTP verification

2. **Dashboard Screen**
   - Active deployments
   - Attendance summary
   - Billing summary
   - Quick actions

3. **Manpower Request Screen**
   - Request form (workers needed, duration, location)
   - Available workers list
   - Confirm request

4. **Deployed Workers Screen**
   - Worker list with real-time status
   - Attendance tracking
   - Worker contact details
   - Performance ratings

5. **Attendance & Timesheets Screen**
   - Daily attendance view
   - Approve/reject timesheets
   - Export attendance reports

6. **Invoices & Billing Screen**
   - Invoice list
   - Invoice details (GST breakdown)
   - Download PDF
   - Payment status

7. **Support & Complaints Screen**
   - Raise complaint/ticket
   - Track ticket status
   - Chat with support

---

## Primary Content and Functionality

### Worker Home Screen
- **Header**: Greeting, current date, weather (optional)
- **Status Card**: Large card showing today's shift status (On Duty / Off Duty / Pending)
- **Quick Actions**: Two large buttons (Check-in GPS / Check-out GPS)
- **Attendance Status**: Today's attendance status with time stamps
- **Upcoming Shifts**: Horizontal scrollable list of next 3 shifts
- **Notifications**: Unread count badge

### Attendance Screen
- **Map View**: Interactive map showing current location and check-in radius
- **Check-in/Check-out Buttons**: Large, prominent buttons with GPS status
- **Location Details**: Address, accuracy, timestamp
- **Attendance History**: Scrollable list of past 30 days with times
- **Manual Request**: Button to request manual attendance approval

### Shift Management Screen
- **Calendar View**: Month view with shift indicators
- **Shift Details**: Tap to see full details (time, location, supervisor, pay rate)
- **Accept/Reject**: Action buttons for pending shifts
- **Deployment Status**: Visual indicator (Assigned / Confirmed / Completed)

### Salary Screen
- **Current Month Card**: Total earnings, payment date
- **Breakdown**: Base salary, overtime, bonuses, deductions
- **Payment History**: Last 6 months in list format
- **Payslip Download**: PDF download button

### Documents Screen
- **Upload Cards**: Aadhaar, Passport, Visa (if applicable)
- **Status Badges**: Pending / Verified / Expired / Rejected
- **Expiry Alerts**: Red banner for documents expiring within 30 days
- **Re-upload Option**: For rejected documents

### Notifications Screen
- **Notification List**: Chronological order, newest first
- **Categories**: Shift reminders, approvals, announcements, alerts
- **Mark as Read**: Swipe to dismiss or tap to open
- **Clear All**: Option to clear read notifications

### Profile Screen
- **Avatar Section**: Profile picture, name, worker ID
- **Details**: Phone, email, emergency contact
- **Settings**: Language, notification preferences, dark mode
- **Logout**: Red button at bottom

---

## Key User Flows

### Flow 1: Daily Check-in (Worker)
1. Open app → Home screen
2. Tap "Check-in GPS" button
3. App requests location permission
4. Shows map with current location
5. Confirm check-in → Success notification
6. Home screen updates to "On Duty"
7. Notification sent to supervisor

### Flow 2: Accept New Shift (Worker)
1. Receive push notification "New shift assigned"
2. Tap notification → Shift details screen
3. Review shift (time, location, pay)
4. Tap "Accept Shift" → Confirmation dialog
5. Shift moves to "Confirmed" status
6. Notification sent to supervisor
7. Return to Home screen

### Flow 3: Request Manpower (Client)
1. Open Client Portal → Dashboard
2. Tap "Request Manpower" button
3. Fill form (workers needed, duration, location, job type)
4. System shows available workers
5. Select workers → Confirm request
6. Notification sent to admin
7. Admin assigns and confirms
8. Client sees deployed workers on dashboard

### Flow 4: Approve Attendance (Supervisor)
1. Open Supervisor App → Dashboard
2. Tap "Pending Approvals" badge
3. See list of workers with pending attendance
4. Tap worker → View GPS location and time
5. Tap "Approve" or "Reject"
6. Notification sent to worker
7. Attendance updated in system

### Flow 5: Download Payslip (Worker)
1. Open Salary screen
2. Tap on month card
3. See detailed breakdown
4. Tap "Download Payslip" button
5. PDF generated and downloaded
6. Option to share via email/WhatsApp

---

## Color Choices

### Brand Colors
- **Primary (Teal)**: `#0a7ea4` — Used for primary buttons, highlights, active states
- **Secondary (Orange)**: `#ff9500` — Used for alerts, warnings, overtime indicators
- **Success (Green)**: `#22C55E` — Used for approved, completed, verified states
- **Warning (Amber)**: `#F59E0B` — Used for pending, expiring documents
- **Error (Red)**: `#EF4444` — Used for rejected, failed, critical alerts

### Neutral Colors
- **Background**: `#ffffff` (light), `#151718` (dark)
- **Surface**: `#f5f5f5` (light), `#1e2022` (dark)
- **Foreground (Text)**: `#11181C` (light), `#ECEDEE` (dark)
- **Muted (Secondary Text)**: `#687076` (light), `#9BA1A6` (dark)
- **Border**: `#E5E7EB` (light), `#334155` (dark)

### Semantic Usage
- **Check-in/Approved**: Green (`#22C55E`)
- **Check-out/Completed**: Teal (`#0a7ea4`)
- **Pending/Awaiting**: Orange (`#ff9500`)
- **Rejected/Error**: Red (`#EF4444`)
- **Expiring Soon**: Amber (`#F59E0B`)

---

## Layout Principles

1. **Safe Area**: All content respects notch and home indicator
2. **Thumb Zone**: Primary actions (buttons) within thumb reach (bottom 40% of screen)
3. **Card-Based**: Information organized in cards with clear hierarchy
4. **Bottom Tab Bar**: 4-5 tabs for main navigation
5. **Modal Sheets**: For secondary actions (filters, confirmations)
6. **Haptic Feedback**: Light haptics on button press, medium on confirmation
7. **Loading States**: Skeleton screens for data loading
8. **Empty States**: Friendly messages when no data available

---

## Typography

- **Display (Hero)**: 32px, bold, `#11181C`
- **Heading 1**: 24px, bold, `#11181C`
- **Heading 2**: 18px, semibold, `#11181C`
- **Body**: 16px, regular, `#11181C`
- **Caption**: 14px, regular, `#687076`
- **Small**: 12px, regular, `#9BA1A6`

---

## Navigation Structure

### Worker App (Tab Bar)
1. **Home** — Dashboard, quick actions
2. **Attendance** — Check-in/out, history
3. **Shifts** — Assigned shifts, calendar
4. **Salary** — Payroll, payslips
5. **Profile** — Settings, documents, profile

### Supervisor App (Tab Bar)
1. **Dashboard** — Overview, alerts
2. **Workers** — Worker management
3. **Approvals** — Pending approvals
4. **Reports** — Analytics
5. **Profile** — Settings

---

## Accessibility

- **Minimum Touch Target**: 44x44 points
- **Color Contrast**: WCAG AA (4.5:1 for text)
- **Font Scaling**: Supports dynamic type (up to 200%)
- **VoiceOver Support**: All interactive elements labeled
- **Haptic Feedback**: Provides non-visual feedback for actions

---

## Performance Considerations

- **Lazy Loading**: Shift calendar and attendance history load on scroll
- **Caching**: Recent shifts, payslips cached locally
- **Offline Mode**: Basic functionality available without internet
- **Image Optimization**: Avatar and document images compressed
- **API Optimization**: Batch requests where possible

---

## Future Enhancements

- Face recognition attendance (AI feature)
- Biometric login (Face ID / Fingerprint)
- Real-time location tracking (with privacy controls)
- Predictive shift recommendations
- In-app chat with supervisor
- Performance ratings and reviews
- Skill-based worker matching
