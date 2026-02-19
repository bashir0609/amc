# MOT Booking Form Upgrade Plan

## Goal

Upgrade the MOT booking form from a basic HTML form to an interactive calendar-based booking system matching the original Auto MOT Centre website's design.

## Current vs Target Design

### Current Implementation
- Simple HTML date/time inputs
- Standard form layout
- Basic email notifications
- No availability checking

### Target Implementation
- Interactive calendar widget
- Visual date selection with availability indicators
- Modal-based booking workflow
- Real-time slot availability
- Modern, premium design

## Proposed Changes

### 1. Calendar Component

**File**: `components/BookingCalendar.tsx` [NEW]

Create a custom calendar component with:
- Month/year navigation
- Visual date grid
- Available/unavailable date indicators
- Selected date highlighting
- Responsive design

### 2. Time Slot Selection

**File**: `components/TimeSlotPicker.tsx` [NEW]

Features:
- Display available time slots for selected date
- Visual slot availability (9 Available, etc.)
- Slot selection UI
- Disable unavailable slots

### 3. Booking Modal

**File**: `components/BookingModal.tsx` [NEW]

Modal workflow:
- Step 1: Select date from calendar
- Step 2: Select time slot
- Step 3: Enter customer details
- Step 4: Confirmation

### 4. Updated MOT Booking Page

**File**: [app/mot-booking/page.tsx](file:///e:/Development/Websites/AMC/app/mot-booking/page.tsx) [MODIFY]

Changes:
- Integrate calendar component
- Add modal state management
- Implement multi-step booking flow
- Keep existing email notification system

### 5. Availability Data Structure

**File**: `lib/availability.ts` [NEW]

Mock availability data:
- Define available dates/times
- Business hours configuration
- Holiday/closed dates
- Slot capacity management

## Technical Approach

### Dependencies
- No additional packages needed
- Use React state for calendar logic
- Tailwind CSS for styling
- Lucide icons for UI elements

### State Management
```typescript
- selectedDate: Date | null
- selectedTime: string | null
- showModal: boolean
- currentMonth: Date
- availableSlots: TimeSlot[]
```

### Styling
- Match existing design system
- Use gradient-primary for selected dates
- Card-based modal design
- Smooth animations and transitions

## Verification Plan

1. **Visual Testing**
   - Calendar displays correctly
   - Date selection works
   - Modal opens/closes smoothly
   - Responsive on mobile/tablet/desktop

2. **Functional Testing**
   - Date navigation works
   - Time slot selection
   - Form validation
   - Email notifications still work

3. **UX Testing**
   - Intuitive booking flow
   - Clear availability indicators
   - Error handling
   - Success confirmation

## Implementation Steps

1. Create availability data structure
2. Build calendar component
3. Build time slot picker
4. Create booking modal
5. Update MOT booking page
6. Test complete flow
7. Verify email notifications
8. Mobile responsiveness check
