import React, { useEffect, useReducer, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  eventStartInteractionReducer,
  getActiveEventSteps,
  getLinkedEventSteps,
  INITIAL_EVENT_START_INTERACTION,
  SCAN_PASS_SEGMENTS,
  type EventStartInteractionAction,
  type EventStartInteractionState,
  type EventStartPhase,
  type EventStartStep,
} from "./PetMindEventStartInteraction";

const ASSETS = {
  sectionDecor: "/figma-assets/petmind-assistant-05-section-decor.svg",
  triangle: "/figma-assets/petmind-assistant-05-triangle.svg",
  eventIcon: "/figma-assets/petmind-assistant-05-event-icon.svg",
  preconfigIcon: "/figma-assets/petmind-assistant-05-preconfig-icon.svg",
  preconfigDividerWide: "/figma-assets/petmind-assistant-05-preconfig-divider-wide.svg",
  preconfigDividerMedium: "/figma-assets/petmind-assistant-05-preconfig-divider-medium.svg",
  preconfigDividerNarrow: "/figma-assets/petmind-assistant-05-preconfig-divider-narrow.svg",
  stageReadBadge: "/figma-assets/petmind-assistant-05-stage-read-badge.svg",
  tabDivider: "/figma-assets/petmind-assistant-05-tab-divider.svg",
  tabArrows: [
    "/figma-assets/petmind-assistant-05-tab-arrow-1.svg",
    "/figma-assets/petmind-assistant-05-tab-arrow-2.svg",
    "/figma-assets/petmind-assistant-05-tab-arrow-3.svg",
    "/figma-assets/petmind-assistant-05-tab-arrow-4.svg",
    "/figma-assets/petmind-assistant-05-tab-arrow-5.svg",
  ],
  stageIcons: [
    "/figma-assets/petmind-assistant-05-stage-icon.svg",
    "/figma-assets/petmind-assistant-05-stage-b2.svg",
    "/figma-assets/petmind-assistant-05-stage-b3.svg",
    "/figma-assets/petmind-assistant-05-stage-b4.svg",
    "/figma-assets/petmind-assistant-05-stage-b5.svg",
    "/figma-assets/petmind-assistant-05-stage-b6.svg",
  ],
  flowDown: "/figma-assets/petmind-assistant-05-flow-down.svg",
  branchArrow: "/figma-assets/petmind-assistant-05-branch-arrow.svg",
  returnArrow: "/figma-assets/petmind-assistant-05-return-arrow.svg",
  footnote: "/figma-assets/petmind-assistant-05-footnote.svg",
  owner: "/figma-assets/petmind-geo-06-avatar-owner.png",
  employee: "/figma-assets/petmind-geo-06-avatar-employee.png",
  ai: "/figma-assets/petmind-geo-06-avatar-ai.png",
  merchant: "/figma-assets/petmind-assistant-05-avatar-merchant.png",
  passport: "/figma-assets/petmind-assistant-05-passport.png",
  passportBlink: "/figma-assets/petmind-assistant-05-passport-blink.svg",
  specialCursor: "/figma-assets/petmind-assistant-05-special-cursor.svg",
  specialCursorFallback: "/figma-assets/petmind-assistant-05-special-cursor.png",
  serviceInteractionImage: "/figma-assets/petmind-assistant-05-service-interaction-image.png",
  scanGradient: "/figma-assets/petmind-assistant-05-scan-gradient.svg",
  scanLine: "/figma-assets/petmind-assistant-05-scan-line.svg",
  recordingVideo: "/figma-assets/petmind-assistant-05-recording-video.png",
  recordingVideoLoop: "/figma-assets/petmind-assistant-05-service-recording-loop.mp4",
  recordingAi: "/figma-assets/petmind-assistant-05-recording-ai.png",
  recordingPetThumbnail: "/figma-assets/petmind-assistant-05-recording-pet-thumbnail.png",
  recordingStatusDot: "/figma-assets/petmind-assistant-05-recording-status-dot.svg",
  recordingClear: "/figma-assets/petmind-assistant-05-recording-clear.svg",
  recordingConfirmControl: "/figma-assets/petmind-assistant-05-recording-confirm-control.svg",
  recordingServiceComplete: "/figma-assets/petmind-assistant-05-recording-service-complete.svg",
  recordingServiceCurrent: "/figma-assets/petmind-assistant-05-recording-service-current.svg",
  recordingServiceIcons: [
    "/figma-assets/petmind-assistant-05-recording-service-1.svg",
    "/figma-assets/petmind-assistant-05-recording-service-2.svg",
    "/figma-assets/petmind-assistant-05-recording-service-3.svg",
    "/figma-assets/petmind-assistant-05-recording-service-4.svg",
    "/figma-assets/petmind-assistant-05-recording-service-5.svg",
    "/figma-assets/petmind-assistant-05-recording-service-6.svg",
    "/figma-assets/petmind-assistant-05-recording-service-7.svg",
    "/figma-assets/petmind-assistant-05-recording-service-8.svg",
  ],
  aiRecognitionReceipt: "/figma-assets/petmind-assistant-05-ai-recognition-receipt.png",
  aiRecognitionReportShell:
    "/figma-assets/petmind-assistant-05-ai-recognition-report-employee-confirmed-2x.png",
  aiRecognitionReportContent:
    "/figma-assets/petmind-assistant-05-ai-recognition-report-content-4x.png",
  aiReceiptReportCat: "/figma-assets/petmind-assistant-05-ai-receipt-report-cat.png",
  aiReceiptTitleDefault: "/figma-assets/petmind-assistant-05-ai-receipt-title-default.svg",
  aiReceiptSubtitleDefault: "/figma-assets/petmind-assistant-05-ai-receipt-subtitle-default.svg",
  aiReceiptSpinner: "/figma-assets/petmind-assistant-05-ai-receipt-spinner.svg",
  aiReceiptCornerDefault: "/figma-assets/petmind-assistant-05-ai-receipt-corner-default.svg",
  aiReceiptTitleUnconfirmed:
    "/figma-assets/petmind-assistant-05-ai-receipt-title-unconfirmed.svg",
  aiReceiptSubtitleUnconfirmed:
    "/figma-assets/petmind-assistant-05-ai-receipt-subtitle-unconfirmed.svg",
  aiReceiptUnconfirmedBadge:
    "/figma-assets/petmind-assistant-05-ai-receipt-unconfirmed-badge.svg",
  aiReceiptCornerUnconfirmed:
    "/figma-assets/petmind-assistant-05-ai-receipt-corner-unconfirmed.svg",
  reviewSendActionSheetBackground:
    "/figma-assets/petmind-assistant-05-review-send-action-sheet-background.svg",
  reviewSendPhotoPicker:
    "/figma-assets/petmind-assistant-05-review-send-photo-picker-3x.png",
  reviewSendPhotoPickerSelected:
    "/figma-assets/petmind-assistant-05-review-send-photo-picker-selected.png",
  reviewSendProgressComplete:
    "/figma-assets/petmind-assistant-05-review-send-progress-complete.svg",
  reviewSendReceiptBadgeConfirmed:
    "/figma-assets/petmind-assistant-05-review-send-receipt-badge-confirmed.svg",
  reviewSendReceiptCornerConfirmed:
    "/figma-assets/petmind-assistant-05-review-send-receipt-corner-confirmed.svg",
  reviewSendReceiptSubtitleConfirmed:
    "/figma-assets/petmind-assistant-05-review-send-receipt-subtitle-confirmed.svg",
  reviewSendReceiptTitleConfirmed:
    "/figma-assets/petmind-assistant-05-review-send-receipt-title-confirmed.svg",
  reviewSendReportContentConfirmed:
    "/figma-assets/petmind-assistant-05-review-send-report-content-confirmed-4x.png",
  reviewSendPassportOwnerHome:
    "/figma-assets/petmind-assistant-05-passport-owner-home.jpg",
  reviewSendPassportPawSticker:
    "/figma-assets/petmind-assistant-05-passport-paw-sticker.png",
  reviewSendPassportNotificationContainer:
    "/figma-assets/petmind-assistant-05-passport-notification-container-4x.png",
  reviewSendPassportCameraLens:
    "/figma-assets/petmind-assistant-05-passport-camera-lens.png",
  reviewSendPassportCameraLens1:
    "/figma-assets/petmind-assistant-05-passport-camera-lens1.svg",
  reviewSendPassportCameraLine:
    "/figma-assets/petmind-assistant-05-passport-camera-line.svg",
  reviewSendPassportNotificationBlink:
    "/figma-assets/petmind-assistant-05-passport-notification-blink.svg",
  actionConfigDividerHorizontal:
    "/figma-assets/petmind-assistant-05-action-config-divider-horizontal.svg",
  actionConfigDividerVertical:
    "/figma-assets/petmind-assistant-05-action-config-divider-vertical.svg",
  actionOwnerSplash:
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-passport-splash.jpg",
  actionOwnerReportBackground:
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-report-background.png",
  actionOwnerReportDivider:
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-report-divider.svg",
  actionOwnerThumbnailPlay:
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-thumbnail-play.svg",
  actionOwnerSwitchHandleLeft:
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-switch-handle-left.svg",
  actionOwnerSwitchHandleRight:
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-switch-handle-right.svg",
  actionOwnerSteps: [
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-hair-combing.png",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-full-body-rinse.png",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-ear-cleaning.png",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-blow-dry.png",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-basic-trim.png",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-teeth-brushing.png",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-butt-trim.png",
    "/figma-assets/petmind-assistant-05-action-orchestration-owner-step-paw-trim.png",
  ],
  actionEmployeeNotificationList:
    "/figma-assets/action-orchestration-employee-notification-list.png",
  actionEmployeeFollowUpMessage:
    "/figma-assets/action-orchestration-employee-follow-up-message.jpg",
  actionEmployeeFollowUpCompose:
    "/figma-assets/action-orchestration-employee-follow-up-compose.jpg",
  actionEmployeeFollowUpSent:
    "/figma-assets/action-orchestration-employee-follow-up-sent.jpg",
  actionMerchantDashboardInitial:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-dashboard-initial.jpg",
  actionMerchantDashboardUpdated:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-dashboard-updated.jpg",
  actionMerchantResultPreview:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-reassign-result-preview.png",
  actionMerchantExecutedCheck:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-executed-check.svg",
  actionMerchantProgressLine:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-line.svg",
  actionMerchantProgressStep1Active:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-1-active.svg",
  actionMerchantProgressStep1Complete:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-1-complete.svg",
  actionMerchantProgressStep1Executed:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-1-executed.svg",
  actionMerchantProgressStep2Active:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-2-active.svg",
  actionMerchantProgressStepInactive:
    "/figma-assets/petmind-assistant-05-action-orchestration-merchant-progress-step-inactive.svg",
  reachRoutingOwnerReplyImproved:
    "/figma-assets/petmind-assistant-05-reach-routing-owner-reply-improved.jpg",
  reachRoutingOwnerReplyUnchanged:
    "/figma-assets/petmind-assistant-05-reach-routing-owner-reply-unchanged.jpg",
  reachRoutingEmployeeNextFollowUp1:
    "/figma-assets/petmind-assistant-05-reach-routing-employee-next-followup-1.jpg",
  reachRoutingEmployeeNextFollowUp2:
    "/figma-assets/petmind-assistant-05-reach-routing-employee-next-followup-2.jpg",
  reachRoutingWorsenedBackgroundDraft:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-background-draft.jpg",
  reachRoutingWorsenedBackgroundThread:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-background-thread.jpg",
  reachRoutingWorsenedOwnerBase:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-owner-base.png",
  reachRoutingWorsenedReport:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-report.png",
  reachRoutingWorsenedFollowUp:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-followup.png",
  reachRoutingWorsenedOwnerReply:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-owner-reply.png",
  reachRoutingWorsenedAiAdvice:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-ai-advice.png",
  reachRoutingWorsenedSlotsInitial:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-slots-initial.png",
  reachRoutingWorsenedSlotsActive:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-slots-active.png",
  reachRoutingWorsenedDoctorInitial:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-doctor-initial.png",
  reachRoutingWorsenedDoctorActive:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-doctor-active.png",
  reachRoutingWorsenedSlotConfirmed:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-slot-confirmed.png",
  reachRoutingWorsenedAppointment:
    "/figma-assets/petmind-assistant-05-reach-routing-worsened-appointment.png",
  reachRoutingDiagnosisSchedule:
    "/figma-assets/petmind-assistant-05-reach-routing-diagnosis-schedule.jpg",
  reachRoutingScheduleDutyMorning:
    "/figma-assets/petmind-assistant-05-reach-routing-schedule-duty-morning.png",
  reachRoutingScheduleBoardingSmall:
    "/figma-assets/petmind-assistant-05-reach-routing-schedule-boarding-small.png",
  reachRoutingScheduleDutyAfternoon:
    "/figma-assets/petmind-assistant-05-reach-routing-schedule-duty-afternoon.png",
  reachRoutingScheduleBoardingMedium:
    "/figma-assets/petmind-assistant-05-reach-routing-schedule-boarding-medium.png",
  reachRoutingScheduleDiagnosisNew:
    "/figma-assets/petmind-assistant-05-reach-routing-schedule-diagnosis-new.png",
  reachRoutingDiagnosisDayCount:
    "/figma-assets/petmind-assistant-05-reach-routing-diagnosis-day-count.png",
  reachRoutingDiagnosisNewIndicator:
    "/figma-assets/petmind-assistant-05-reach-routing-diagnosis-new-indicator.png",
  reachRoutingDiagnosisDivider:
    "/figma-assets/petmind-assistant-05-reach-routing-diagnosis-divider.svg",
  reachRoutingOverdueMerchantInitial:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-initial.jpg",
  reachRoutingOverdueMerchantPreview:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-preview.jpg",
  reachRoutingOverdueMerchantUpdated:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-updated.jpg",
  reachRoutingOverdueMerchantExecutedCheck:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-executed-check.svg",
  reachRoutingOverdueMerchantProgressLine:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-progress-line.svg",
  reachRoutingOverdueMerchantProgressStep1Active:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-progress-step-1-active.svg",
  reachRoutingOverdueMerchantProgressStep1Complete:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-progress-step-1-complete.svg",
  reachRoutingOverdueMerchantProgressStep1Executed:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-progress-step-1-executed.svg",
  reachRoutingOverdueMerchantProgressStep2Active:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-progress-step-2-active.svg",
  reachRoutingOverdueMerchantProgressStepInactive:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-merchant-progress-step-inactive.svg",
  reachRoutingOverdueOwnerSidebarInitial:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-sidebar-initial.jpg",
  reachRoutingOverdueOwnerSidebarUnread1:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-sidebar-unread-1.jpg",
  reachRoutingOverdueOwnerSidebarUnread2:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-sidebar-unread-2.jpg",
  reachRoutingOverdueOwnerChatBackground:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-background.jpg",
  reachRoutingOverdueOwnerChatHistory1:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-history-1.png",
  reachRoutingOverdueOwnerChatHistory2:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-history-2.png",
  reachRoutingOverdueOwnerChatHistory3:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-history-3.png",
  reachRoutingOverdueOwnerChatOverlay1:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-overlay-1.png",
  reachRoutingOverdueOwnerChatOverlay2:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-overlay-2.png",
  reachRoutingOverdueOwnerChatOverlay3:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-overlay-3.png",
  reachRoutingOverdueOwnerChatOverlay4:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-overlay-4.png",
  reachRoutingOverdueOwnerChatOverlay5:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-overlay-5.png",
  reachRoutingOverdueOwnerChatOverlay6:
    "/figma-assets/petmind-assistant-05-reach-routing-overdue-owner-chat-overlay-6.png",
  reachRoutingNextFollowUpCheckIn:
    "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-checkin.png",
  reachRoutingNextFollowUpReportDelivered:
    "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-report.png",
  reachRoutingNextFollowUpQuestion:
    "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-question.png",
  reachRoutingNextFollowUpOwnerReply:
    "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-owner-photo.png",
  reachRoutingNextFollowUpEmployeeReply:
    "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-employee-advice.png",
  reachRoutingNextFollowUpOwnerAck:
    "/figma-assets/petmind-assistant-05-reach-routing-next-followup-message-owner-ack.png",
  reachRoutingObservationOwnerReply:
    "/figma-assets/petmind-assistant-05-reach-routing-observation-message-owner-reply.png",
  reachRoutingObservationEmployeeReply:
    "/figma-assets/petmind-assistant-05-reach-routing-observation-message-employee-reply.png",
  reachRoutingObservationBackground:
    "/figma-assets/petmind-assistant-05-reach-routing-observation-background.png",
  reachRoutingObservationComposeBackground:
    "/figma-assets/petmind-assistant-05-reach-routing-observation-compose-background.png",
  reachRoutingReportCat:
    "/figma-assets/petmind-assistant-05-reach-routing-report-cat.png",
  reachRoutingOwnerAvatar:
    "/figma-assets/petmind-assistant-05-reach-routing-owner-avatar.png",
  reachRoutingOwnerPhoto1:
    "/figma-assets/petmind-assistant-05-reach-routing-owner-photo-1.png",
  reachRoutingOwnerPhoto2:
    "/figma-assets/petmind-assistant-05-reach-routing-owner-photo-2.png",
  reachRoutingPackageCat:
    "/figma-assets/petmind-assistant-05-reach-routing-package-cat.png",
  reachRoutingLuna:
    "/figma-assets/petmind-assistant-05-reach-routing-luna.svg",
  reachRoutingDivider:
    "/figma-assets/petmind-assistant-05-reach-routing-divider.svg",
  reachRoutingReportCorner:
    "/figma-assets/petmind-assistant-05-reach-routing-report-corner.svg",
  reachRoutingFollowUpLabel:
    "/figma-assets/petmind-assistant-05-reach-routing-followup-label.svg",
  reachRoutingAutoLabel:
    "/figma-assets/petmind-assistant-05-reach-routing-auto-label.svg",
  reachRoutingSwitchOffLeft:
    "/figma-assets/petmind-assistant-05-reach-routing-switch-off-left.svg",
  reachRoutingSwitchOffRight:
    "/figma-assets/petmind-assistant-05-reach-routing-switch-off-right.svg",
  reachRoutingSwitchOnLeft:
    "/figma-assets/petmind-assistant-05-reach-routing-switch-on-left.svg",
  reachRoutingSwitchOnRight:
    "/figma-assets/petmind-assistant-05-reach-routing-switch-on-right.svg",
  eventStartPrototypes: [
    "/figma-assets/petmind-assistant-05-event-start-01-owner-passport-3x.png",
    "/figma-assets/petmind-assistant-05-event-start-02-employee-scan-3x.png",
    "/figma-assets/petmind-assistant-05-event-start-03-employee-confirm-3x.png",
    "/figma-assets/petmind-assistant-05-event-start-04-employee-record-3x.png",
  ],
} as const;

type StageIndex = 0 | 1 | 2 | 3 | 4 | 5;
type Actor = "owner" | "employee" | "ai" | "merchant";
type AiRecognitionGroup = "evidence" | "report";
type AiReportPhase = "recording" | "collapsing" | "receipt" | "report" | "final";
type ReviewSendGroup = "draft-review" | "passport-write";
type ReviewSendPhase = "sheet" | "album" | "albumSelected" | "reportComplete" | "receipt" | "passportWrite";
type PassportIslandPhase = "compact" | "wide" | "notification";
type ActionOrchestrationRole = "owner" | "employee" | "merchant";
type OwnerActionPhase = "splash" | "report";
type EmployeeActionPhase = "list" | "message" | "compose" | "sent";
type MerchantActionPhase = "dashboard" | "preview" | "updated";
type MerchantCompletionPhase = "conflict" | "executed" | "next-task";
type ReachRoutingView =
  | "owner-feedback"
  | "observation-ended"
  | "owner-unchanged"
  | "next-followup"
  | "owner-worsened"
  | "diagnosis-task"
  | "merchant-wakeup"
  | "owner-repurchase";
// Legacy pair retained as a searchable contract for the original improved flow:
// type ReachRoutingView = "owner-feedback" | "observation-ended";
type ReachRoutingRoute = "improved" | "unchanged" | "worsened" | "overdue";

const ACTION_OWNER_SPLASH_HOLD_SECONDS = 0.6;
const ACTION_OWNER_REPORT_DISSOLVE_SECONDS = 0.3;
const ACTION_MERCHANT_COMPLETION_EXECUTED_DELAY_MS = 200;
const ACTION_MERCHANT_COMPLETION_NEXT_DELAY_MS = 1300;
const ACTION_MERCHANT_COMPLETION_SMART_ANIMATE_SECONDS = 0.3;
const REACH_ROUTING_TRANSITION_SECONDS = 0.3;
const REACH_ROUTING_EASING = "easeOut";
const REACH_ROUTING_VIEWS = ["owner-feedback", "observation-ended"] as const;
const REACH_ROUTING_UNCHANGED_VIEWS = [
  "owner-unchanged",
  "next-followup",
] as const;
const REACH_ROUTING_WORSENED_VIEWS = [
  "owner-worsened",
  "diagnosis-task",
] as const;
const REACH_ROUTING_OVERDUE_VIEWS = [
  "merchant-wakeup",
  "owner-repurchase",
] as const;
const REACH_ROUTING_ROUTE_VIEWS = {
  improved: REACH_ROUTING_VIEWS,
  unchanged: REACH_ROUTING_UNCHANGED_VIEWS,
  worsened: REACH_ROUTING_WORSENED_VIEWS,
  overdue: REACH_ROUTING_OVERDUE_VIEWS,
} satisfies Record<ReachRoutingRoute, readonly ReachRoutingView[]>;
const REACH_ROUTING_ROUTE_INITIAL_VIEW = {
  improved: "owner-feedback",
  unchanged: "owner-unchanged",
  worsened: "owner-worsened",
  overdue: "merchant-wakeup",
} satisfies Record<ReachRoutingRoute, ReachRoutingView>;
const REACH_ROUTING_OVERDUE_MERCHANT_PHASES = [
  "dashboard",
  "preview",
  "updated",
] as const;
type ReachRoutingOverdueMerchantPhase =
  (typeof REACH_ROUTING_OVERDUE_MERCHANT_PHASES)[number];
const REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES = [
  "opportunity",
  "executed",
  "next-task",
] as const;
type ReachRoutingOverdueMerchantCompletionPhase =
  (typeof REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES)[number];
const REACH_ROUTING_OVERDUE_MERCHANT_SWITCH_MS = [200, 1300] as const;
const REACH_ROUTING_OVERDUE_OWNER_PHASES = [
  "initial",
  "unread-one",
  "unread-two",
  "conversation",
] as const;
type ReachRoutingOverdueOwnerPhase =
  (typeof REACH_ROUTING_OVERDUE_OWNER_PHASES)[number];
// 4084:28435 → 28458 → 29512: each waits 500ms, then Smart Animates for 300ms.
const REACH_ROUTING_OVERDUE_OWNER_SWITCH_MS = [500, 1300] as const;
const REACH_ROUTING_WORSENED_PHASES = [
  "draft",
  "sent",
  "slots",
  "selected",
  "appointment",
] as const;
type ReachRoutingWorsenedPhase =
  (typeof REACH_ROUTING_WORSENED_PHASES)[number];
const REACH_ROUTING_DIAGNOSIS_INSERT_DELAY_MS = 600;
const REACH_ROUTING_OBSERVATION_PHASES = [
  "initial",
  "owner-reply",
  "employee-reply",
  "owner-ack",
  "closed",
] as const;
type ReachRoutingObservationPhase =
  (typeof REACH_ROUTING_OBSERVATION_PHASES)[number];
const REACH_ROUTING_OBSERVATION_SWITCH_MS = [200, 1100, 2000, 2900] as const;
const REACH_ROUTING_NEXT_FOLLOWUP_PHASES = [
  "initial",
  "owner-reply",
  "employee-reply",
  "owner-ack",
  "scheduled",
] as const;
type ReachRoutingNextFollowUpPhase =
  (typeof REACH_ROUTING_NEXT_FOLLOWUP_PHASES)[number];
const REACH_ROUTING_NEXT_FOLLOWUP_SWITCH_MS = [200, 1100, 2000, 2900] as const;
const REACH_ROUTING_VIEW_COPY = {
  "owner-feedback": {
    title: "宠主反馈【已改善】",
    subtitle: "宠主端｜华瑞爱宠",
    side: "owner",
  },
  "observation-ended": {
    title: "本轮观察结束",
    subtitle: "员工端｜员工小程序",
    side: "employee",
  },
  "owner-unchanged": {
    title: "宠主反馈【无变化】",
    subtitle: "宠主端｜华瑞爱宠",
    side: "owner",
  },
  "next-followup": {
    title: "安排下一次回访",
    subtitle: "员工端｜员工小程序",
    side: "employee",
  },
  "owner-worsened": {
    title: "宠主反馈【加重】",
    subtitle: "宠主端｜华瑞爱宠",
    side: "owner",
  },
  "diagnosis-task": {
    title: "新增诊疗任务",
    subtitle: "员工端｜员工小程序",
    side: "employee",
  },
  "merchant-wakeup": {
    title: "商户端｜用户唤醒",
    subtitle: "商户端｜客户经营",
    side: "merchant",
  },
  "owner-repurchase": {
    title: "宠主端｜复购邀约",
    subtitle: "宠主端｜PetMind",
    side: "owner",
  },
} as const;

const REACH_ROUTING_SWITCH_ACTIVE_BACKGROUND: Record<ReachRoutingView, string> = {
  "owner-feedback":
    "linear-gradient(270deg, rgb(255, 196, 141) 0%, rgba(255, 196, 141, 0) 100%), linear-gradient(90deg, rgb(255, 141, 178) 0%, rgb(255, 141, 178) 100%)",
  "observation-ended":
    "linear-gradient(270deg, rgb(255, 141, 178) 0%, rgba(255, 141, 178, 0) 100%), linear-gradient(90deg, rgb(255, 196, 141) 0%, rgb(255, 196, 141) 100%)",
  "owner-unchanged":
    "linear-gradient(270deg, rgb(255, 196, 141) 0%, rgba(255, 196, 141, 0) 100%), linear-gradient(90deg, rgb(255, 141, 178) 0%, rgb(255, 141, 178) 100%)",
  "next-followup":
    "linear-gradient(270deg, rgb(255, 141, 178) 0%, rgba(255, 141, 178, 0) 100%), linear-gradient(90deg, rgb(255, 196, 141) 0%, rgb(255, 196, 141) 100%)",
  "owner-worsened":
    "linear-gradient(270deg, rgb(255, 196, 141) 0%, rgba(255, 196, 141, 0) 100%), linear-gradient(90deg, rgb(255, 141, 178) 0%, rgb(255, 141, 178) 100%)",
  "diagnosis-task":
    "linear-gradient(270deg, rgb(255, 141, 178) 0%, rgba(255, 141, 178, 0) 100%), linear-gradient(90deg, rgb(255, 196, 141) 0%, rgb(255, 196, 141) 100%)",
  "merchant-wakeup":
    "linear-gradient(270deg, rgb(255, 141, 178) 0%, rgba(255, 141, 178, 0) 100%), linear-gradient(90deg, rgb(120, 161, 255) 0%, rgb(120, 161, 255) 100%)",
  "owner-repurchase":
    "linear-gradient(270deg, rgb(120, 161, 255) 0%, rgba(120, 161, 255, 0) 100%), linear-gradient(90deg, rgb(255, 141, 178) 0%, rgb(255, 141, 178) 100%)",
};

const STAGES = [
  {
    number: "1",
    label: "事件开启",
    title: "服务事件开启：身份匹配并启动视频记录",
    description: "护照码确认宠物、预约与服务项目，系统创建事件并加载服务执行清单。",
    tint: 0,
    activeConfigs: [0, 3],
  },
  {
    number: "2",
    label: "AI 识别",
    title: "AI 识别与报告生成：从视频证据到报告草稿",
    description: "同一视频界面继续保留，但视觉焦点转向完成度、关键证据和待确认项。",
    tint: 0.05,
    activeConfigs: [0, 2, 3],
  },
  {
    number: "3",
    label: "复核发送",
    title: "员工复核与发送：确认事实后推送既有护照",
    description: "员工纠正误判、补充现场观察；确认后由系统发送宠主并写入 Luna 护照。",
    tint: 0.1,
    activeConfigs: [2],
  },
  {
    number: "4",
    label: "行动编排",
    title: "行动编排：围绕既有护照生成后续行动",
    description: "报告进入 Luna 既有护照，AI 再为宠主、员工与商户生成不同的下一步。",
    tint: 0.15,
    activeConfigs: [0, 1],
  },
  {
    number: "5",
    label: "触达分流",
    title: "触达分流：自动回访与异常升级",
    description: "系统按规则自动触达；宠主反馈加重或高风险时停止自动建议并转人工。",
    tint: 0.2,
    activeConfigs: [1, 2],
  },
  {
    number: "6",
    label: "结果回写",
    title: "结果回写：更新上下文并进入下一轮",
    description: "反馈、处理与经营结果写回 Luna；再次到店时生成新的服务事件。",
    tint: 0.25,
    activeConfigs: [],
  },
] as const;

const PRECONFIG_ITEMS = [
  {
    title: "商户服务配置",
    description: "服务项目、套餐清单、报告结构与建议周期",
    divider: ASSETS.preconfigDividerWide,
  },
  {
    title: "自动化规则",
    description: "回访时间、渠道、未回复处理与任务分配",
    divider: ASSETS.preconfigDividerMedium,
  },
  {
    title: "平台风险边界",
    description: "低可信处理、禁止医疗诊断与异常升级",
    divider: ASSETS.preconfigDividerNarrow,
  },
  {
    title: "观察与描述标准",
    description: "视频采集提示、异常描述字段与证据要求",
    divider: ASSETS.preconfigDividerMedium,
  },
] as const;

const ACTOR_ASSETS: Record<Actor, string> = {
  owner: ASSETS.owner,
  employee: ASSETS.employee,
  ai: ASSETS.ai,
  merchant: ASSETS.merchant,
};

const EVENT_START_SELECTED_CARD_BACKGROUND =
  "linear-gradient(90deg, rgba(67, 100, 176, 0.03) 0%, rgba(67, 100, 176, 0.03) 100%), linear-gradient(90deg, rgba(226, 226, 226, 0.5) 0%, rgba(226, 226, 226, 0.5) 100%)";
const WORKFLOW_SELECTED_CENTER_STROKE =
  "0 0 0 0.5px #92a3c9, inset 0 0 0 0.5px #92a3c9";
const WORKFLOW_DEFAULT_CENTER_STROKE =
  "0 0 0 0.5px #d2d2d2, inset 0 0 0 0.5px #d2d2d2";
const WORKFLOW_EVIDENCE_CENTER_STROKE =
  "0 0 0 0.5px #c2c9d8, inset 0 0 0 0.5px #c2c9d8";

const EVENT_START_RECORDING_SERVICES = [
  "毛发梳理",
  "全身冲洗",
  "耳部清洁",
  "拉毛吹干",
  "基础修剪",
  "刷牙护理",
  "修屁股",
  "剃小脚",
] as const;

const EVENT_START_STEPS = [
  {
    actors: ["owner"] as const,
    configDescription: "扫码后自动匹配已购套餐，加载对应的服务项目清单",
    configTitle: "预配置生效：商户服务配置",
    frameNodeId: "3465:30671",
    prototypeActor: "owner" as const,
    prototypeAlt: "宠主端展示 Luna 既有宠物护照二维码",
    prototypeDescription: "宠主展示既有护照码",
    prototypeNodeId: "3469:31016",
    prototypeRole: "宠主端 ｜ 宠物护照APP",
    prototypeSrc: ASSETS.eventStartPrototypes[0],
    selectedHeaderBackground:
      "linear-gradient(90deg, rgba(255, 141, 178, 0.5) 0%, rgba(153, 85, 107, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)",
    summary: "身份关联已经存在，不再重复认领宠物护照",
    title: "宠主展示 Luna 护照码",
  },
  {
    actors: ["employee"] as const,
    configDescription: "根据预约和订单匹配已购套餐、本次服务项目",
    configTitle: "预配置生效：商户服务配置",
    frameNodeId: "3465:30851",
    prototypeActor: "employee" as const,
    prototypeAlt: "员工端扫描 Luna 宠物护照并核验服务细节",
    prototypeDescription: "扫码核验服务细节",
    prototypeNodeId: "3467:30931",
    prototypeRole: "员工端 ｜ 员工小程序",
    prototypeSrc: ASSETS.eventStartPrototypes[1],
    selectedHeaderBackground:
      "linear-gradient(90deg, rgba(255, 196, 141, 0.5) 0%, rgba(153, 118, 85, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)",
    summary: "核对 Luna、预约、已购套餐与本次服务项目",
    title: "员工扫码并确认服务信息",
  },
  {
    actors: ["ai"] as const,
    configDescription: "将已购项目加载为本次服务执行清单，并写入事件",
    configTitle: "预配置生效：商户服务配置",
    frameNodeId: "3469:31028",
    prototypeActor: "employee" as const,
    prototypeAlt: "员工端确认 Luna 身份与套餐并开启服务事件",
    prototypeDescription: "开启服务事件",
    prototypeNodeId: "3469:31046",
    prototypeRole: "员工端 ｜ 员工小程序",
    prototypeSrc: ASSETS.eventStartPrototypes[2],
    selectedHeaderBackground:
      "linear-gradient(90deg, rgba(131, 199, 130, 0.5) 0%, rgba(64, 97, 63, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)",
    summary: "加载对应服务执行清单，建立视频与事件的持续关联",
    title: "系统创建本次服务事件",
  },
  {
    actors: ["employee"] as const,
    configDescription: "在视频界面提示建议拍摄角度、关键环节与异常证据要求",
    configTitle: "预配置生效：观察与描述标准",
    frameNodeId: "3470:31172",
    prototypeActor: "employee" as const,
    prototypeAlt: "员工端视频记录与服务项目清单界面",
    prototypeDescription: "服务准备，待开启",
    prototypeNodeId: "3470:31190",
    prototypeRole: "员工端 ｜ 员工小程序",
    prototypeSrc: ASSETS.eventStartPrototypes[3],
    selectedHeaderBackground:
      "linear-gradient(90deg, rgba(255, 196, 141, 0.5) 0%, rgba(153, 118, 85, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)",
    summary: "服务视频持续写入事件；AI 开始辅助识别服务进度",
    title: "员工启动视频记录",
  },
] as const;

function PetMindAssistantDivider() {
  return (
    <div
      className="content-stretch flex gap-[24px] items-end pt-[28px] relative shrink-0 w-full"
      data-node-id="2396:14597"
      data-name="Section Divider"
    >
      <div
        className="absolute content-stretch flex items-start left-0 opacity-15 top-[8px]"
        data-node-id="I2396:14597;2396:14467"
        data-name="标题辅助装饰"
      >
        <div className="h-[32px] relative shrink-0 w-[213.97px]">
          <img alt="" aria-hidden="true" className="absolute block inset-0 max-w-none size-full" draggable={false} src={ASSETS.sectionDecor} />
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start justify-end min-w-px opacity-80 relative">
        <div className="content-stretch flex gap-[12px] items-end relative shrink-0">
          <p className="[word-break:break-word] font-['Alibaba_PuHuiTi_2.0:115_Black',sans-serif] leading-[30px] text-[#181818] text-[36px] whitespace-nowrap">
            05 · AI 驱动的闭环工作流
          </p>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="-scale-y-100 flex-none rotate-180">
              <img alt="" aria-hidden="true" className="block size-[18px]" draggable={false} src={ASSETS.triangle} />
            </div>
          </div>
        </div>
        <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[20px] min-w-full text-[#1a1c1c] text-[12px] text-justify w-[min-content]">
          以 Luna 的一次洗护服务为例，展示现场事实如何被 AI 转化为服务报告、照护计划与跟进任务，并在人工确认和执行回写中持续更新。
        </p>
      </div>
    </div>
  );
}

function PetMindAssistantEventContext() {
  return (
    <div
      className="bg-[#e2e2e2] border border-[#d2d2d2] border-solid content-stretch flex flex-col gap-[16px] items-start justify-center px-[24px] py-[20px] relative rounded-[8px] shrink-0 w-full"
      data-node-id="2874:21335"
      data-name="Quote Details"
    >
      <div className="content-stretch flex gap-[8px] items-start relative rounded-[4px] shrink-0 w-full">
        <img alt="" aria-hidden="true" className="block shrink-0 size-[24px]" draggable={false} src={ASSETS.eventIcon} />
        <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Bold',sans-serif] leading-[24px] min-w-px text-[#474747] text-[16px]">
          前置服务事件：Luna 完成洗护后，员工记录局部泛红与持续抓挠。
        </p>
      </div>
      <div className="bg-[#d2d2d2] h-px relative shrink-0 w-full" />
      <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[24px] text-[#474747] text-[12px] text-justify w-full">
        下面以这条服务事件为例，展示 AI 如何结合历史上下文形成状态判断，并分别转译为宠主、员工和商户可执行的下一步行动。
      </p>
    </div>
  );
}

function PetMindPreconfiguration({ stage }: { stage: StageIndex }) {
  const activeConfigs = STAGES[stage].activeConfigs as readonly number[];

  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start py-[24px] relative rounded-[8px] shrink-0 w-full" data-node-id="3071:31625">
      <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-[318px]">
        <img alt="" aria-hidden="true" className="block shrink-0 size-[14px]" draggable={false} src={ASSETS.preconfigIcon} />
        <p className="[word-break:break-word] font-['OPPOSans:Bold',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] text-center whitespace-nowrap">
          预配置层
        </p>
        <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[20px] opacity-60 text-[#1a1c1c] text-[11px] whitespace-nowrap">
          流程外提前配置｜工作流运行时按阶段自动读取
        </p>
      </div>

      <div
        className="border border-[#d2d2d2] border-solid grid overflow-clip relative rounded-[8px] shrink-0 w-full"
        style={{ gridTemplateColumns: "1fr 216px 210px 216px" }}
      >
        {PRECONFIG_ITEMS.map((item, index) => {
          const active = activeConfigs.includes(index);
          return (
            <div
              className={`content-stretch flex flex-col items-start min-w-0 relative self-stretch ${
                index < PRECONFIG_ITEMS.length - 1 ? "border-r border-[#d2d2d2]" : ""
              } ${active ? "bg-[#e2e2e2]" : "opacity-50"}`}
              key={item.title}
            >
              <div className="bg-[rgba(226,226,226,0.5)] content-stretch flex gap-[10px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] whitespace-nowrap">
                  {item.title}
                </p>
                {active && (
                  <span
                    className="bg-[rgba(67,100,176,0.8)] content-stretch flex h-[13px] items-center justify-center overflow-clip relative rounded-[2px] shrink-0 w-[44px]"
                    data-node-id="3340:26626"
                    data-name="Quote Details"
                  >
                    <img
                      alt="本阶段读取"
                      className="block h-[7px] shrink-0 w-[37px]"
                      draggable={false}
                      src={ASSETS.stageReadBadge}
                    />
                  </span>
                )}
              </div>
              <img alt="" aria-hidden="true" className="block h-px shrink-0 w-full" draggable={false} src={item.divider} />
              <div className="content-stretch flex flex-col items-start justify-center px-[16px] py-[9px] relative shrink-0 w-full">
                <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[20px] text-[#1a1c1c] text-[10px] whitespace-nowrap">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PetMindStageNavigator({
  stage,
  onStageChange,
}: {
  stage: StageIndex;
  onStageChange: (stage: StageIndex) => void;
}) {
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusStage = (nextStage: StageIndex) => {
    onStageChange(nextStage);
    buttonRefs.current[nextStage]?.focus();
  };

  return (
    <div
      aria-label="AI 驱动的闭环工作流阶段"
      className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[864px]"
      data-node-id="3026:28544"
      role="tablist"
    >
      {STAGES.map((item, index) => {
        const selected = stage === index;
        const stageIndex = index as StageIndex;
        return (
          <React.Fragment key={item.number}>
            <button
              aria-controls={`petmind-assistant-stage-panel-${item.number}`}
              aria-selected={selected}
              className="group box-border content-stretch cursor-pointer flex flex-[1_0_0] h-[32px] items-center min-w-px overflow-clip relative rounded-[8px] focus:outline-none"
              data-node-id={index === 0 ? "2984:28025" : undefined}
              id={`petmind-assistant-stage-tab-${item.number}`}
              onClick={() => onStageChange(stageIndex)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  focusStage(((index + 1) % STAGES.length) as StageIndex);
                } else if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  focusStage(((index + STAGES.length - 1) % STAGES.length) as StageIndex);
                } else if (event.key === "Home") {
                  event.preventDefault();
                  focusStage(0);
                } else if (event.key === "End") {
                  event.preventDefault();
                  focusStage(5);
                }
              }}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              role="tab"
              style={{
                backgroundImage: selected
                  ? "linear-gradient(90deg, rgba(182, 204, 255, 0.2) 0%, rgba(182, 204, 255, 0.2) 100%), linear-gradient(90deg, rgba(214, 214, 214, 0.5) 0%, rgba(214, 214, 214, 0.5) 100%)"
                  : `linear-gradient(90deg, rgba(162, 182, 228, ${item.tint}) 0%, rgba(162, 182, 228, ${item.tint}) 100%), linear-gradient(90deg, rgba(214, 214, 214, 0.5) 0%, rgba(214, 214, 214, 0.5) 100%)`,
              }}
              type="button"
            >
              <span className="content-stretch flex h-full items-center relative shrink-0">
                <span className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[32px]">
                  <span
                    className={`font-['DINOT:Bold',sans-serif] leading-[20px] text-[12px] text-justify tracking-[1.44px] whitespace-nowrap ${
                      selected ? "text-[#4364b0]" : "text-[#474747] group-hover:text-[#4364b0]"
                    }`}
                  >
                    {item.number}
                  </span>
                </span>
                <img alt="" aria-hidden="true" className="block h-full shrink-0 w-px" draggable={false} src={ASSETS.tabDivider} />
              </span>
              <span className="content-stretch flex items-center justify-center pl-[12px] pr-[14px] relative shrink-0">
                <span
                  className={`font-['OPPOSans:Bold',sans-serif] leading-[20px] text-[12px] text-center tracking-[0.48px] whitespace-nowrap ${
                    selected ? "text-[#4364b0]" : "text-[#474747] group-hover:text-[#4364b0]"
                  }`}
                >
                  {item.label}
                </span>
              </span>
              {selected && (
                <span
                  aria-hidden="true"
                  className="border-2 border-[#a2b6e4] border-solid inset-0 pointer-events-none absolute rounded-[8px] z-[1]"
                />
              )}
            </button>
            {index < ASSETS.tabArrows.length && (
              <img alt="" aria-hidden="true" className="block shrink-0 size-[24px]" draggable={false} src={ASSETS.tabArrows[index]} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function ActorIcons({ actors, gap = 2 }: { actors: readonly Actor[]; gap?: number }) {
  return (
    <span
      className="content-stretch flex items-center relative shrink-0"
      style={{ gap }}
    >
      {actors.map((actor, index) => (
        <img
          alt=""
          aria-hidden="true"
          className="block rounded-full shrink-0 size-[16px]"
          draggable={false}
          key={`${actor}-${index}`}
          src={ACTOR_ASSETS[actor]}
        />
      ))}
    </span>
  );
}

function CardSummary({ active = false, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <p
      className={`[word-break:break-word] font-['OPPOSans:${active ? "Regular" : "Light"}',sans-serif] leading-[20px] text-[11px] text-justify ${
        active ? "text-[#35508d]" : "text-[#1a1c1c]"
      }`}
    >
      {children}
    </p>
  );
}

function ConfigNote({
  title,
  children,
  active = false,
  compact = false,
  divided = false,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  active?: boolean;
  compact?: boolean;
  divided?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`[word-break:break-word] content-stretch flex flex-col items-start overflow-clip relative rounded-[4px] text-justify ${
        divided ? "bg-transparent text-[#151616]" : active ? "bg-[rgba(67,100,176,0.05)] text-[#35508d]" : "bg-[rgba(26,28,28,0.03)] text-[#151616]"
      } ${divided ? "flex-1 gap-[4px] min-w-0 p-[10px]" : compact ? "gap-[4px] h-[48px] justify-center px-[8px] py-0" : "gap-[8px] px-[10px] py-[8px]"} ${className}`}
    >
      <p className={`font-['OPPOSans:Medium',sans-serif] ${divided ? "leading-[16px] shrink-0 whitespace-nowrap" : "leading-[12px]"} text-[11px] ${active ? "opacity-75" : "opacity-60"}`}>{title}</p>
      <p
        className={`font-['OPPOSans:Regular',sans-serif] ${divided ? "leading-[16px] shrink-0 text-[10px] w-full" : `leading-[14px] ${compact ? "text-[9px] whitespace-nowrap" : "text-[10px]"}`} ${
          active ? "opacity-75" : "opacity-60"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function EventStartFlowCard({
  buttonRef,
  focused,
  hovered,
  index,
  item,
  onKeyDown,
  onPointerEnter,
  onPointerLeave,
  onSelect,
  selected,
}: {
  buttonRef: (node: HTMLButtonElement | null) => void;
  focused: boolean;
  hovered: boolean;
  index: number;
  item: (typeof EVENT_START_STEPS)[number];
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
  onSelect: () => void;
  selected: boolean;
}) {
  return (
    <button
      aria-controls="petmind-event-start-prototype"
      aria-label={item.title}
      aria-pressed={selected}
      className="group appearance-none border-0 content-stretch flex h-[153px] flex-col items-start overflow-clip p-0 relative rounded-[8px] shrink-0 text-left w-[380px] focus:outline-none focus-visible:outline-none"
      data-event-start-step={index + 1}
      data-state={selected ? "selected" : hovered ? "hover" : "default"}
      id={`petmind-event-start-flow-${index + 1}`}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      ref={buttonRef}
      style={{
        ...(selected ? { backgroundImage: EVENT_START_SELECTED_CARD_BACKGROUND } : {}),
        boxShadow:
          selected || hovered
            ? WORKFLOW_SELECTED_CENTER_STROKE
            : WORKFLOW_DEFAULT_CENTER_STROKE,
      }}
      tabIndex={focused ? 0 : -1}
      type="button"
    >
      <div
        className={`content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full ${
          selected ? "" : "bg-[#e2e2e2]"
        }`}
        data-name="Header"
        style={selected ? { backgroundImage: item.selectedHeaderBackground } : undefined}
      >
        {!selected && (
          <span
            aria-hidden="true"
            className={`absolute bg-[rgba(67,100,176,0.1)] inset-0 pointer-events-none transition-none ${
              hovered ? "opacity-100" : "opacity-0 group-focus-visible:opacity-100"
            }`}
          />
        )}
        <span className="relative z-[1]">
          <ActorIcons actors={item.actors} />
        </span>
        <p
          className={`[word-break:break-word] leading-[20px] relative shrink-0 text-[12px] whitespace-nowrap z-[1] ${
            selected
              ? "font-['OPPOSans:Bold',sans-serif] text-white"
              : "font-['OPPOSans:Medium',sans-serif] opacity-80 text-[#474747]"
          }`}
        >
          {item.title}
        </p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-start justify-center min-h-px pb-[8px] pt-[10px] relative w-full">
        <div className="px-[16px] w-full">
          <CardSummary active={selected}>{item.summary}</CardSummary>
        </div>
        <div className="px-[8px] w-full">
          <ConfigNote active={selected} title={item.configTitle}>
            {item.configDescription}
          </ConfigNote>
        </div>
      </div>
    </button>
  );
}

function EventStartRescanLabel() {
  return (
    <div
      className="absolute bg-[rgba(255,255,255,0.05)] content-stretch flex h-[40px] items-center justify-center left-[22px] rounded-[20px] top-[571px] w-[96px]"
      data-name="Rescan Text"
    >
      <p className="font-['PingFang_SC:Medium',sans-serif] leading-[18.749px] text-[11.931px] text-center text-white whitespace-nowrap">
        重新扫描
      </p>
    </div>
  );
}

function EventStartScanLayer({
  onComplete,
  runId,
}: {
  onComplete: (runId: number) => void;
  runId: number;
}) {
  const [segmentIndex, setSegmentIndex] = useState<0 | 1>(0);
  const segment = SCAN_PASS_SEGMENTS[segmentIndex];

  const finishSegment = () => {
    if (segmentIndex === SCAN_PASS_SEGMENTS.length - 1) {
      onComplete(runId);
    } else {
      setSegmentIndex(1);
    }
  };

  return (
    <div
      className="absolute left-[65px] overflow-hidden pointer-events-none rounded-[12px] size-[190px] top-[296px] z-[2]"
      data-event-start-scan-card
      data-scan-pass={segment.pass}
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute block inset-0 max-w-none size-full"
        data-event-start-scan-image
        draggable={false}
        src={ASSETS.serviceInteractionImage}
      />
      <motion.img
        alt=""
        animate={{ height: segment.gradientHeight }}
        aria-hidden="true"
        className="absolute block left-0 max-w-none top-0 w-[190px]"
        data-event-start-scan-gradient
        draggable={false}
        initial={{ height: 0 }}
        key={`scan-fill-${runId}-${segmentIndex}`}
        src={ASSETS.scanGradient}
        transition={{ duration: segment.durationSeconds, ease: segment.ease }}
      />
      <motion.img
        alt=""
        animate={{ y: segment.lineY }}
        aria-hidden="true"
        className="absolute block h-[17px] left-0 max-w-none pointer-events-none top-0 w-[190px]"
        data-event-start-scan-line
        draggable={false}
        initial={{ y: -17 }}
        key={`scan-line-${runId}-${segmentIndex}`}
        onAnimationComplete={finishSegment}
        src={ASSETS.scanLine}
        transition={{ duration: segment.durationSeconds, ease: segment.ease }}
      />
    </div>
  );
}

function EventStartScanPrototype({
  onComplete,
  runId,
}: {
  onComplete: (runId: number) => void;
  runId: number;
}) {
  return (
    <div className="absolute inset-0" data-event-start-scan-stage>
      <EventStartRescanLabel />
      <div
        className="absolute content-stretch flex h-[40px] items-center justify-center left-[135.79px] rounded-[20px] top-[571px] w-[162px]"
        data-name="Start Service Text"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(140, 249, 126, 0.1) 0%, rgba(140, 249, 126, 0.1) 100%), linear-gradient(90deg, rgba(129, 129, 129, 0.5) 0%, rgba(129, 129, 129, 0.5) 100%)",
        }}
      >
        <p className="font-['PingFang_SC:Semibold',sans-serif] leading-[18.749px] opacity-60 text-[#101010] text-[11.931px] text-center whitespace-nowrap">
          立即开启服务记录
        </p>
      </div>
      <EventStartScanLayer key={runId} onComplete={onComplete} runId={runId} />
    </div>
  );
}

function EventStartDetailsPrototype({
  onActivate,
  shouldReduceMotion,
}: {
  onActivate: () => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="absolute inset-0" data-event-start-details>
      <EventStartRescanLabel />
      <button
        aria-label="进入员工启动视频记录"
        className="absolute appearance-none bg-[#8cf97e] border-0 content-stretch cursor-pointer flex h-[40px] items-center justify-center left-[136px] p-0 rounded-[20px] top-[571px] w-[162px] z-[2]"
        data-event-start-details-hotspot
        onClick={onActivate}
        type="button"
      >
        <span className="font-['PingFang_SC:Semibold',sans-serif] leading-[18.749px] text-[#101010] text-[11.931px] text-center whitespace-nowrap">
          立即开启服务记录
        </span>
      </button>
      <motion.div
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
        aria-hidden="true"
        className="absolute border-8 border-[rgba(255,255,255,0.5)] border-solid h-[48px] left-[132px] pointer-events-none rounded-[24px] top-[567px] w-[170px] z-[3]"
        data-event-start-details-blink
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
        }
      />
    </div>
  );
}

type RecordingPrototypeMode = "ready" | "recording" | "confirm";

type RecordingPlaybackSnapshot = {
  capturedAt: number;
  currentTime: number;
};

type RecordingPlaybackRef = {
  current: RecordingPlaybackSnapshot;
};

const RECORDING_CONTROL_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const RECORDING_UI_EASE = [0.4, 0, 0.2, 1] as const;
const RECORDING_TIMER_START_SECONDS = 48 * 60 + 23;
const AI_REPORT_PHASE_SEQUENCE = ["collapsing", "receipt", "report"] as const;
const REVIEW_SEND_PHASE_SEQUENCE = ["sheet", "album", "albumSelected", "reportComplete", "receipt", "passportWrite"] as const;
const PASSPORT_ISLAND_PHASE_SEQUENCE = ["compact", "wide", "notification"] as const;
const PASSPORT_ISLAND_WIDE_START_MS = 400;
const PASSPORT_ISLAND_NOTIFICATION_START_MS = 701;
const AI_REPORT_COLLAPSE_DURATION_MS = 420;
const AI_REPORT_COMPLETE_DELAY_MS = 1440;

function RecordingServiceItem({
  index,
  recording,
  shouldReduceMotion,
}: {
  index: number;
  recording: boolean;
  shouldReduceMotion: boolean;
}) {
  const completed = recording && index < 3;
  const current = recording && index === 3;
  const baseIconOpacity = recording ? (index < 4 ? 0 : 0.5) : 1;
  const trailingGap = recording
    ? [2, 2, 12, 12, 2, 2, 2, 0][index]
    : index === EVENT_START_RECORDING_SERVICES.length - 1
      ? 0
      : 8;
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.32,
    ease: RECORDING_UI_EASE,
  };

  return (
    <motion.div
      animate={{
        backgroundColor: recording && !current ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0.3)",
      }}
      className="backdrop-blur-[1.704px] content-stretch flex gap-[5px] items-center pl-[6px] pr-[8px] py-[2px] rounded-[6px] shrink-0 w-[66px]"
      data-name="Service Item"
      initial={false}
      layout={shouldReduceMotion ? false : "position"}
      layoutDependency={recording}
      style={{ marginBottom: trailingGap }}
      transition={transition}
    >
      <span className="relative shrink-0 size-[10.227px]">
        <motion.img
          alt=""
          animate={{ opacity: baseIconOpacity }}
          aria-hidden="true"
          className="absolute block inset-0 max-w-none size-full"
          draggable={false}
          initial={false}
          src={ASSETS.recordingServiceIcons[index]}
          transition={transition}
        />
        {index < 3 && (
          <motion.img
            alt=""
            animate={{ opacity: completed ? 1 : 0 }}
            aria-hidden="true"
            className="absolute block left-1/2 max-w-none size-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2"
            draggable={false}
            initial={false}
            src={ASSETS.recordingServiceComplete}
            transition={transition}
          />
        )}
        {index === 3 && (
          <motion.img
            alt=""
            animate={{ opacity: current ? 1 : 0 }}
            aria-hidden="true"
            className="absolute block left-1/2 max-w-none size-[10px] top-1/2 -translate-x-1/2 -translate-y-1/2"
            draggable={false}
            initial={false}
            src={ASSETS.recordingServiceCurrent}
            transition={transition}
          />
        )}
      </span>
      <motion.span
        animate={{
          color: current ? "rgb(140, 249, 126)" : "rgb(255, 255, 255)",
          opacity: recording && !current ? 0.5 : 1,
        }}
        className="font-['PingFang_SC:Medium',sans-serif] leading-[17.044px] text-[9.374px] text-center whitespace-nowrap"
        initial={false}
        transition={transition}
      >
        {EVENT_START_RECORDING_SERVICES[index]}
      </motion.span>
    </motion.div>
  );
}

function RecordingServiceList({
  recording,
  shouldReduceMotion,
}: {
  recording: boolean;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="content-stretch flex flex-col items-start px-[14px] py-[10px]">
      {EVENT_START_RECORDING_SERVICES.map((service, index) => (
        <RecordingServiceItem
          index={index}
          key={service}
          recording={recording}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </div>
  );
}

function AiReceiptReportCard({
  onActivate,
  unconfirmed,
}: {
  onActivate?: () => void;
  unconfirmed: boolean;
}) {
  const transition = { duration: 0.28, ease: RECORDING_UI_EASE };

  return (
    <motion.div
      animate={{
        backgroundColor: unconfirmed ? "rgb(251, 245, 245)" : "rgb(248, 248, 248)",
        borderColor: unconfirmed ? "rgba(161, 77, 77, 0.5)" : "rgba(159, 159, 159, 0.5)",
      }}
      className="absolute border-[0.5px] border-solid bottom-[22px] content-stretch flex gap-[8px] h-[52px] items-center left-[14px] pl-[6px] rounded-bl-[4px] rounded-br-[2px] rounded-tl-[4px] rounded-tr-[4px] w-[216px]"
      data-name="Report Card"
      initial={false}
      transition={transition}
    >
      <span className="overflow-hidden relative rounded-[6px] shrink-0 size-[40px]">
        <img
          alt="Luna"
          className="absolute inset-0 max-w-none object-cover size-full"
          draggable={false}
          src={ASSETS.aiReceiptReportCat}
        />
      </span>
      <span className={`content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-start justify-center min-w-px relative ${unconfirmed ? "pt-[4px]" : ""}`}>
        <span className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
          <span className="h-[12px] relative shrink-0 w-[29.998px]">
            {[false, true].map((state) => (
              <motion.img
                alt=""
                animate={{ opacity: unconfirmed === state ? 1 : 0 }}
                aria-hidden="true"
                className="absolute block inset-0 max-w-none size-full"
                draggable={false}
                initial={false}
                key={String(state)}
                src={state ? ASSETS.aiReceiptTitleUnconfirmed : ASSETS.aiReceiptTitleDefault}
                transition={transition}
              />
            ))}
          </span>
          <span className="h-[10px] relative shrink-0 w-[76px]">
            {[false, true].map((state) => (
              <motion.img
                alt=""
                animate={{ opacity: unconfirmed === state ? 1 : 0 }}
                aria-hidden="true"
                className="absolute block inset-0 max-w-none size-full"
                draggable={false}
                initial={false}
                key={String(state)}
                src={state ? ASSETS.aiReceiptSubtitleUnconfirmed : ASSETS.aiReceiptSubtitleDefault}
                transition={transition}
              />
            ))}
          </span>
        </span>
        <motion.span
          animate={{ opacity: unconfirmed ? 1 : 0 }}
          className="font-['PingFang_SC:Regular',sans-serif] leading-[18px] text-[#a14d4d] text-[10px] whitespace-nowrap"
          initial={false}
          transition={transition}
        >
          报告编号：260722A045
        </motion.span>
        <motion.img
          alt=""
          animate={{ opacity: unconfirmed ? 0 : 1, rotate: unconfirmed ? 90 : 0 }}
          aria-hidden="true"
          className="-translate-y-1/2 absolute right-[12px] size-[16px] top-1/2"
          draggable={false}
          initial={false}
          src={ASSETS.aiReceiptSpinner}
          transition={transition}
        />
      </span>
      <motion.img
        alt=""
        animate={{ opacity: unconfirmed ? 0 : 1 }}
        aria-hidden="true"
        className="absolute left-[200.5px] size-[15px] top-[36.5px]"
        draggable={false}
        initial={false}
        src={ASSETS.aiReceiptCornerDefault}
        transition={transition}
      />
      <motion.span
        animate={{ opacity: unconfirmed ? 1 : 0 }}
        className="absolute bg-[#a14d4d] content-stretch flex h-[12px] items-center justify-center px-[4px] right-[-0.5px] rounded-bl-[4px] rounded-br-[1px] rounded-tl-[1px] rounded-tr-[4px] top-[-0.5px]"
        initial={false}
        transition={transition}
      >
        <img
          alt="未确认"
          className="block h-[6.5px] w-[19.998px]"
          draggable={false}
          src={ASSETS.aiReceiptUnconfirmedBadge}
        />
      </motion.span>
      <motion.img
        alt=""
        animate={{ opacity: unconfirmed ? 1 : 0 }}
        aria-hidden="true"
        className="absolute left-[200.5px] size-[15px] top-[36.5px]"
        draggable={false}
        initial={false}
        src={ASSETS.aiReceiptCornerUnconfirmed}
        transition={transition}
      />
      {onActivate ? (
        <button
          aria-label="进入员工复核 AI 洗护报告"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer inset-0 p-0 pointer-events-auto rounded-[4px] z-[2]"
          data-ai-report-card-hotspot
          onClick={onActivate}
          type="button"
        />
      ) : null}
    </motion.div>
  );
}

function AiRecognitionFinalReport({
  onAdvanceToReviewSend,
  shouldReduceMotion,
  visible,
}: {
  onAdvanceToReviewSend?: () => void;
  shouldReduceMotion: boolean;
  visible: boolean;
}) {
  const transition = {
    duration: shouldReduceMotion ? 0 : 0.38,
    ease: RECORDING_UI_EASE,
  };

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      aria-hidden={!visible}
      className="absolute inset-0 overflow-hidden rounded-[28px] z-[20]"
      data-ai-recognition-final-report
      initial={false}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      transition={transition}
    >
      <img
        alt="AI 服务报告"
        className="absolute block inset-0 max-w-none size-full"
        draggable={false}
        height={692}
        src={ASSETS.aiRecognitionReportShell}
        width={320}
      />
      <div className="absolute content-stretch flex flex-col gap-[10px] h-[467px] items-start left-[10px] overflow-hidden top-[140px] w-[300px]">
        <div className="content-stretch flex gap-[6px] h-[46px] items-center shrink-0 w-full">
          {[
            ["8个", "服务项目", "缺少2个项目证据"],
            ["7个", "关键片段", "包含1个异常片段"],
          ].map(([count, title, description]) => (
            <div
              className="backdrop-blur-[1.704px] bg-[rgba(255,255,255,0.25)] content-stretch flex flex-col gap-[2px] items-start px-[10px] py-[6px] rounded-[10px] shrink-0 text-white whitespace-nowrap"
              key={title}
            >
              <span className="content-stretch flex font-['PingFang_SC:Semibold',sans-serif] gap-[3.409px] items-start text-[8.52px]">
                <span className="leading-[14.525px]">{count}</span>
                <span className="leading-[14.525px]">{title}</span>
              </span>
              <span className="font-['PingFang_SC:Regular',sans-serif] leading-[11.931px] opacity-60 text-[7.67px] text-center">
                {description}
              </span>
            </div>
          ))}
          <div className="backdrop-blur-[1.704px] bg-[rgba(255,152,152,0.25)] content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start min-w-px px-[10px] py-[6px] rounded-[10px] text-white">
            <span className="content-stretch flex font-['PingFang_SC:Semibold',sans-serif] gap-[3.409px] items-start text-[10px] whitespace-nowrap">
              <span className="leading-[17.044px]">3项</span>
              <span className="leading-[17.044px]">待补充确认</span>
            </span>
            <span className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px w-full">
              <span className="content-stretch flex gap-[3px] items-center">
                {[0, 1, 2].map((dot) => (
                  <span className="bg-[rgba(255,255,255,0.25)] rounded-[2px] size-[10px]" key={dot} />
                ))}
              </span>
              <span className="font-['PingFang_SC:Regular',sans-serif] leading-[14px] opacity-60 text-[9px] text-center whitespace-nowrap">0/3</span>
            </span>
          </div>
        </div>
        <div
          className="[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-[1_0_0] min-h-px overscroll-contain overflow-x-hidden overflow-y-auto relative touch-pan-y w-[300px]"
          data-ai-report-scroll-region
        >
          <img
            alt="AI 服务报告内容"
            className="block h-[883px] max-w-none shrink-0 w-[300px]"
            draggable={false}
            src={ASSETS.aiRecognitionReportContent}
          />
          <motion.button
            animate={
              visible
                ? shouldReduceMotion
                  ? { opacity: 0.5 }
                  : { opacity: [0.3, 0.72, 0.3] }
                : { opacity: 0 }
            }
            aria-label="补充基础修剪证据并进入下一流程"
            className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[43px] left-[14px] p-0 rounded-[4px] top-[232px] w-[271px]"
            data-ai-report-next-flow-hotspot
            onClick={onAdvanceToReviewSend}
            style={{ boxShadow: "0 0 0 4px #8cf97e, inset 0 0 0 4px #8cf97e" }}
            transition={
              visible && !shouldReduceMotion
                ? { duration: 0.8, ease: "easeInOut", repeat: Infinity }
                : { duration: 0 }
            }
            type="button"
          />
        </div>
      </div>
    </motion.div>
  );
}

function EventStartRecordingPrototype({
  mode = "ready",
  onAdvanceToReviewSend,
  onCancelStop,
  onConfirmStop,
  onPrimaryAction,
  onSupplementReport,
  playbackRef,
  recognitionView = "evidence",
  reportPhase = "recording",
  resetToken = 0,
  shouldReduceMotion,
}: {
  mode?: RecordingPrototypeMode;
  onAdvanceToReviewSend?: () => void;
  onCancelStop?: () => void;
  onConfirmStop?: () => void;
  onPrimaryAction?: () => void;
  onSupplementReport?: () => void;
  playbackRef?: RecordingPlaybackRef;
  recognitionView?: AiRecognitionGroup;
  reportPhase?: AiReportPhase;
  resetToken?: number;
  shouldReduceMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const recording = mode !== "ready";
  const confirming = mode === "confirm";
  const reporting = recognitionView === "report";
  const reportReady = reporting && reportPhase === "report";
  const finalReport = reporting && reportPhase === "final";
  const reportLayerVisible = reporting && !finalReport;
  const receiptHeight = reportPhase === "collapsing" ? 4 : reportPhase === "receipt" || reportReady ? 451 : 0;
  const [recordingSeconds, setRecordingSeconds] = useState(RECORDING_TIMER_START_SECONDS);
  const recordingTimer = `${Math.floor(recordingSeconds / 60)} : ${String(recordingSeconds % 60).padStart(2, "0")}`;
  const shapeTarget = recording
      ? { borderRadius: 4, clipPath: RECORDING_CONTROL_CLIP, height: 21, width: 21 }
      : { borderRadius: 34.089, clipPath: RECORDING_CONTROL_CLIP, height: 44.773, width: 44.773 };
  const rememberVideoPosition = () => {
    const video = videoRef.current;
    if (!playbackRef || !video || !Number.isFinite(video.currentTime)) return;

    playbackRef.current = {
      capturedAt: performance.now(),
      currentTime: video.currentTime,
    };
  };

  const restoreVideoPosition = (video: HTMLVideoElement) => {
    if (!playbackRef || playbackRef.current.currentTime <= 0) return;

    const elapsed = Math.max(0, performance.now() - playbackRef.current.capturedAt) / 1000;
    const continuousTime = playbackRef.current.currentTime + elapsed;
    video.currentTime =
      Number.isFinite(video.duration) && video.duration > 0
        ? continuousTime % video.duration
        : continuousTime;
    void video.play().catch(() => undefined);
  };

  const handlePrimaryAction = () => {
    rememberVideoPosition();
    onPrimaryAction?.();
  };

  useEffect(() => {
    if (!recording || reporting) {
      setRecordingSeconds(RECORDING_TIMER_START_SECONDS);
      return;
    }

    setRecordingSeconds(RECORDING_TIMER_START_SECONDS);
    const timer = window.setInterval(() => {
      setRecordingSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [recording, reporting, resetToken]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reporting) {
      video.pause();
      return;
    }

    if (resetToken > 0) {
      video.currentTime = 0;
      if (playbackRef) {
        playbackRef.current = { capturedAt: performance.now(), currentTime: 0 };
      }
    }
    void video.play().catch(() => undefined);
  }, [playbackRef, reporting, resetToken]);

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      data-ai-recognition-group={recognitionView}
      data-ai-report-phase={reportPhase}
      data-event-start-recording
    >
      <div
        className="absolute h-[523px] left-[13px] top-[89px] w-[294px]"
        data-name="Pet Interaction"
        data-node-id={recording ? "3615:23616" : "3474:31892"}
      >
        <div
          className="absolute h-[523px] left-0 top-0 w-[293px]"
          data-name="Additional Content"
          data-node-id="3712:34646"
        >
          <motion.div
            animate={{
              borderBottomLeftRadius: reporting ? 10 : 20,
              borderBottomRightRadius: reporting ? 10 : 20,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: reporting ? 48 : 523,
            }}
            className="absolute bg-[#70c765] h-[523px] left-0 rounded-[20px] top-0 w-[294px]"
            data-name="变化1"
            data-node-id="3712:34647"
            initial={false}
            transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: RECORDING_UI_EASE }}
          />
          <motion.span
            animate={{ opacity: reporting ? 0 : 1 }}
            aria-hidden="true"
            className="absolute border-[1.704px] border-[#467d3f] border-solid inset-[-1.704px] rounded-[21.704px] z-[1]"
            data-event-start-recording-frame-stroke
            initial={false}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: RECORDING_UI_EASE }}
          />
          <motion.div
            animate={{
              backgroundColor: reporting ? "rgb(20, 20, 20)" : "rgba(20, 20, 20, 0)",
              borderRadius: reporting ? 4 : 20,
              height: reporting ? 8 : 523,
              left: reporting ? 14 : 0,
              top: reporting ? 24 : 0,
              width: reporting ? 266 : 294,
            }}
            className="absolute h-[523px] left-0 overflow-hidden rounded-[20px] top-0 w-[294px]"
            data-name="变化2"
            data-node-id="3712:34648"
            initial={false}
            transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: RECORDING_UI_EASE }}
          >
            <motion.video
              animate={{ opacity: reporting ? 0 : 1 }}
              aria-label="Luna 洗护服务现场视频"
              autoPlay
              className="absolute block h-[583.477px] left-[-88.475px] max-w-none object-fill top-0 w-[440.357px]"
              data-event-start-recording-video
              loop
              muted
              onLoadedMetadata={(event) => restoreVideoPosition(event.currentTarget)}
              onTimeUpdate={rememberVideoPosition}
              playsInline
              poster={ASSETS.recordingVideo}
              preload="auto"
              ref={videoRef}
              src={ASSETS.recordingVideoLoop}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: RECORDING_UI_EASE }}
            />
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: reporting ? 0 : 1, x: reporting ? -8 : 0 }}
          className="absolute bg-gradient-to-l content-stretch flex flex-col from-[rgba(0,0,0,0)] h-[523px] items-start left-0 pr-[20px] pt-[48px] rounded-bl-[20px] rounded-tl-[20px] to-[rgba(0,0,0,0.3)] top-0 w-[114px]"
          data-name="Other Details"
          data-node-id={recording ? "3615:23620" : "3474:31845"}
          initial={false}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: RECORDING_UI_EASE }}
        >
          <RecordingServiceList recording={recording} shouldReduceMotion={shouldReduceMotion} />
        </motion.div>

        <motion.div
          animate={{ opacity: reporting ? 0 : 1, y: reporting ? -4 : 0 }}
          className="absolute bg-gradient-to-b content-stretch flex from-[rgba(0,0,0,0.6)] items-center justify-between left-0 pl-[8px] pr-[10px] py-[10px] rounded-tl-[20px] rounded-tr-[20px] to-[rgba(0,0,0,0)] top-0 w-[294px]"
          data-name="Interaction Status Container"
          data-node-id={recording ? "3615:23648" : "3474:31871"}
          initial={false}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: RECORDING_UI_EASE }}
        >
          <div className="content-stretch flex gap-[6px] items-center overflow-hidden px-[10px] rounded-[10px] shrink-0">
            <span className="relative shrink-0 size-[6px]">
              <motion.img
                alt=""
                animate={{ opacity: recording ? 0 : 1 }}
                aria-hidden="true"
                className="-translate-x-1/2 -translate-y-1/2 absolute block left-1/2 max-w-none size-[12.818px] top-1/2"
                draggable={false}
                initial={false}
                src={ASSETS.recordingStatusDot}
                transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: RECORDING_UI_EASE }}
              />
              <motion.span
                animate={{ opacity: recording ? 1 : 0, scale: recording ? 1 : 0.72 }}
                aria-hidden="true"
                className="absolute bg-[#8cf97e] inset-0 rounded-full shadow-[0_0_3.409px_rgba(0,0,0,0.75)]"
                initial={false}
                transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: RECORDING_UI_EASE }}
              />
            </span>
            <motion.span
              animate={{ width: recording ? 30 : 50 }}
              className="h-[18px] overflow-hidden relative"
              initial={false}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: RECORDING_UI_EASE }}
            >
              <motion.span
                animate={{ opacity: recording ? 0 : 1 }}
                className="absolute font-['PingFang_SC:Medium',sans-serif] inset-y-0 leading-[18px] left-0 text-[10px] text-center text-shadow-[0px_0px_3.409px_rgba(0,0,0,0.75)] text-white whitespace-nowrap"
                initial={false}
                transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: RECORDING_UI_EASE }}
              >
                未开始记录
              </motion.span>
              <motion.span
                animate={{ opacity: recording ? 1 : 0 }}
                className="absolute font-['PingFang_SC:Medium',sans-serif] inset-y-0 leading-[18px] left-0 text-[#8cf97e] text-[10px] text-center text-shadow-[0px_0px_3.409px_rgba(0,0,0,0.75)] whitespace-nowrap"
                initial={false}
                transition={{ duration: shouldReduceMotion ? 0 : 0.24, ease: RECORDING_UI_EASE }}
              >
                记录中
              </motion.span>
            </motion.span>
            <motion.span
              animate={{ opacity: recording ? 1 : 0, width: recording ? 40 : 0 }}
              aria-hidden={!recording}
              className="font-['PingFang_SC:Medium',sans-serif] leading-[18px] overflow-hidden pr-px text-[#8cf97e] text-[10px] text-center text-shadow-[0px_0px_3.409px_rgba(0,0,0,0.75)] whitespace-nowrap"
              initial={false}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: RECORDING_UI_EASE }}
            >
              {recordingTimer}
            </motion.span>
          </div>
          <div
            className="backdrop-blur-[20.453px] bg-[rgba(255,255,255,0.25)] border-[0.852px] border-[rgba(255,255,255,0.25)] border-solid content-stretch flex gap-[6px] h-[28px] items-center overflow-hidden pl-[10px] rounded-bl-[12px] rounded-br-[4px] rounded-tl-[4px] rounded-tr-[12px] shrink-0"
            data-name="Other Icon Container"
          >
            <motion.span
              animate={{ color: recording ? "rgb(140, 249, 126)" : "rgb(255, 255, 255)" }}
              className="font-['PingFang_SC:Medium',sans-serif] leading-[18.749px] text-[10.227px] text-center text-shadow-[0px_0px_3.409px_rgba(0,0,0,0.75)] whitespace-nowrap"
              initial={false}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: RECORDING_UI_EASE }}
            >
              智喵
            </motion.span>
            <motion.span
              animate={{ backgroundColor: recording ? "rgb(70, 125, 63)" : "rgb(127, 127, 127)" }}
              className="overflow-hidden relative rounded-[3.409px] shrink-0 size-[27.271px]"
              initial={false}
              transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: RECORDING_UI_EASE }}
            >
              <img
                alt="智喵"
                className="absolute block left-[-19.5%] max-w-none size-[141.37%] top-[-4.15%]"
                draggable={false}
                src={ASSETS.recordingAi}
              />
            </motion.span>
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: reporting ? 0 : 1, y: reporting ? 6 : 0 }}
          className="absolute bg-gradient-to-b content-stretch flex from-[rgba(0,0,0,0)] items-end justify-between left-0 p-[10px] rounded-bl-[20px] rounded-br-[20px] to-[rgba(0,0,0,0.5)] top-[449px] w-[294px]"
          data-name="Interaction Details"
          data-node-id={recording ? "3615:23657" : "3474:31879"}
          initial={false}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: RECORDING_UI_EASE }}
        >
          <div
            className="bg-transparent content-stretch flex gap-[6px] h-[27.271px] items-center overflow-hidden px-[6px] rounded-bl-[4px] rounded-br-[12px] rounded-tl-[12px] rounded-tr-[4px] shrink-0"
            data-name="Interaction Clear"
            data-node-id={recording ? "3615:23658" : "3474:31880"}
          >
            <img
              alt=""
              aria-hidden="true"
              className="block shrink-0 size-[10.227px]"
              draggable={false}
              src={ASSETS.recordingClear}
            />
            <span className="font-['PingFang_SC:Medium',sans-serif] leading-[13.635px] text-[10.227px] text-center text-white whitespace-nowrap">
              清屏
            </span>
          </div>
          <span
            className="backdrop-blur-[20.453px] relative rounded-[12px] shrink-0 size-[54px]"
            data-name="Interaction Clear Icon"
            data-node-id={recording ? "3615:23661" : "3474:31883"}
          >
            <span className="absolute bg-[rgba(255,255,255,0.25)] inset-0 rounded-[12px]" />
            <img
              alt=""
              className="absolute block inset-0 max-w-none object-cover rounded-[12px] size-full"
              draggable={false}
              src={ASSETS.recordingPetThumbnail}
            />
            <span
              aria-hidden="true"
              className="absolute border-[1.704px] border-[rgba(70,125,63,0.5)] border-solid inset-0 pointer-events-none rounded-[12px]"
            />
          </span>
        </motion.div>

        <motion.div
          animate={{ opacity: reporting ? 0 : 1, y: reporting ? 6 : 0 }}
          className="absolute content-stretch flex h-[20px] items-center justify-between left-[95px] top-[458px] w-[102px]"
          data-name="Pet Interaction Header"
          data-node-id={recording ? "3615:23662" : "3474:31884"}
          initial={false}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: RECORDING_UI_EASE }}
        >
          {[".5", "1", "2"].map((speed) => (
            <span
              className={`content-stretch flex flex-col items-center justify-center overflow-hidden rounded-[10px] shrink-0 size-[20px] ${
                speed === "1" ? "backdrop-blur-[5.113px] bg-[rgba(255,255,255,0.2)]" : ""
              }`}
              key={speed}
            >
              <span
                className={`font-['SF_Pro_Text:Regular',sans-serif] leading-[18.749px] text-[11.931px] text-center text-shadow-[0px_0px_1.704px_rgba(0,0,0,0.75)] whitespace-nowrap ${
                  speed === "1" ? "text-[#ffd640]" : "text-white"
                }`}
              >
                {speed}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ height: receiptHeight, opacity: reportLayerVisible ? 1 : 0 }}
        aria-hidden={!reportLayerVisible}
        className="absolute left-[38px] overflow-hidden top-[114px] w-[244px] z-[6]"
        data-ai-report-receipt
        initial={false}
        transition={{
          duration: shouldReduceMotion ? 0 : reportPhase === "receipt" ? 0.72 : 0.28,
          ease: RECORDING_UI_EASE,
        }}
      >
        <div className="absolute bottom-0 h-[451px] left-0 overflow-hidden w-[244px]">
          <img
            alt="洗护服务收据"
            className="absolute inset-0 max-w-none size-full"
            draggable={false}
            src={ASSETS.aiRecognitionReceipt}
          />
          <AiReceiptReportCard
            onActivate={reportReady ? onAdvanceToReviewSend : undefined}
            unconfirmed={reportReady}
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: reportLayerVisible ? 1 : 0, y: reportLayerVisible ? 0 : 8 }}
        aria-hidden={!reportLayerVisible}
        className="absolute content-stretch flex flex-col items-start justify-end left-0 overflow-hidden pb-[30px] pt-[14px] px-[14px] top-[607px] w-[320px] z-[8]"
        data-ai-report-actions
        initial={false}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: RECORDING_UI_EASE }}
      >
        <div className="content-stretch flex gap-[13.635px] items-center relative shrink-0 w-full">
          <div className="content-stretch flex h-[40px] items-center justify-center relative rounded-[20px] shrink-0 w-[96px]">
            <span className="absolute backdrop-blur-[12px] bg-[rgba(255,255,255,0.05)] inset-0 rounded-[20px] shadow-[inset_0_0_8px_rgba(255,255,255,0.05)]" />
            <span className="font-['PingFang_SC:Medium',sans-serif] leading-[18px] relative text-[14px] text-center text-white whitespace-nowrap">补充增项</span>
          </div>
          <motion.button
            animate={{
              background: reportReady
                ? "linear-gradient(90deg, rgb(83, 147, 74) 0%, rgb(140, 249, 126) 100%)"
                : "linear-gradient(90deg, rgba(140, 249, 126, 0.1) 0%, rgba(140, 249, 126, 0.1) 100%), linear-gradient(90deg, rgba(129, 129, 129, 0.5) 0%, rgba(129, 129, 129, 0.5) 100%)",
            }}
            aria-label={reportReady ? "补充洗护报告" : "AI 生成洗护报告中"}
            className="appearance-none border-0 content-stretch flex flex-[1_0_0] h-[40px] items-center justify-center min-w-px p-0 pointer-events-auto relative rounded-[20px]"
            data-ai-report-supplement
            disabled={!reportReady || !onSupplementReport}
            initial={false}
            onClick={onSupplementReport}
            transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: RECORDING_UI_EASE }}
            type="button"
          >
            <motion.span
              animate={{ opacity: reportReady ? 1 : 0.6 }}
              className={`font-['PingFang_SC:Semibold',sans-serif] text-[#101010] text-center whitespace-nowrap ${reportReady ? "leading-[18px] text-[14px]" : "leading-[18.749px] text-[11.931px]"}`}
              initial={false}
            >
              {reportReady ? "补充洗护报告" : "AI生成洗护报告中 ..."}
            </motion.span>
            <motion.span
              animate={
                reportReady
                  ? shouldReduceMotion
                    ? { opacity: 0.5 }
                    : { opacity: [0.25, 0.7, 0.25] }
                  : { opacity: 0 }
              }
              aria-hidden="true"
              className="absolute border-8 border-[rgba(255,255,255,0.5)] inset-[-8px] pointer-events-none rounded-[28px]"
              transition={
                reportReady && !shouldReduceMotion
                  ? { duration: 0.8, ease: "easeInOut", repeat: Infinity }
                  : { duration: shouldReduceMotion ? 0 : 0.2 }
              }
            />
          </motion.button>
        </div>
      </motion.div>

      <AiRecognitionFinalReport
        onAdvanceToReviewSend={onAdvanceToReviewSend}
        shouldReduceMotion={shouldReduceMotion}
        visible={finalReport}
      />

      <motion.button
        animate={{
          backgroundColor: confirming ? "rgba(140, 249, 126, 0)" : "rgba(140, 249, 126, 0.25)",
          borderColor: confirming ? "rgba(140, 249, 126, 0)" : "rgba(140, 249, 126, 0.6)",
          opacity: reporting ? 0 : 1,
          scale: reporting ? 0.86 : 1,
        }}
        aria-label={mode === "ready" ? "开始服务记录并进入 AI 识别" : "停止服务记录"}
        className="absolute appearance-none backdrop-blur-[10.227px] border-[0.852px] border-solid cursor-pointer flex items-center justify-center left-[131.5px] p-0 pointer-events-auto rounded-[32px] size-[55px] top-[585px] z-[4]"
        data-event-start-recording-hotspot
        data-name="Pet Interaction Icon"
        data-node-id={recording ? "3615:23669" : "3471:31417"}
        disabled={reporting || confirming || !onPrimaryAction}
        onClick={handlePrimaryAction}
        style={{ pointerEvents: reporting ? "none" : "auto" }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: [0.4, 0, 0.2, 1] }}
        type="button"
      >
        <motion.span
          animate={{
            ...shapeTarget,
            backgroundColor: "rgb(140, 249, 126)",
            boxShadow: confirming
              ? "0 3.409px 3.409px rgba(0,0,0,0)"
              : "0 3.409px 3.409px rgba(0,0,0,0.18)",
            opacity: confirming ? 0 : 1,
            scale: confirming ? 0.82 : 1,
          }}
          aria-hidden="true"
          className="block relative shrink-0"
          data-recording-control-shape={mode}
          initial={false}
          transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.4, 0, 0.2, 1] }}
        >
        </motion.span>
        <motion.img
          alt=""
          animate={{ opacity: confirming ? 1 : 0, scale: confirming ? 1 : 0.9 }}
          aria-hidden="true"
          className="absolute inset-0 max-w-none pointer-events-none size-full"
          draggable={false}
          initial={false}
          src={ASSETS.recordingConfirmControl}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: RECORDING_UI_EASE }}
        />
      </motion.button>
      <motion.div
        animate={
          reporting || confirming
            ? { opacity: 0 }
            : shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: [1, 0, 1] }
        }
        aria-hidden="true"
        className="absolute border-[6px] border-[rgba(255,255,255,0.5)] border-solid left-[125.5px] pointer-events-none rounded-full size-[67px] top-[579px] z-[3]"
        data-event-start-recording-blink
        data-name="闪烁"
        data-node-id={recording ? "3615:23671" : "3471:31414"}
        transition={
          reporting || confirming || shouldReduceMotion
            ? { duration: shouldReduceMotion ? 0 : 0.2 }
            : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
        }
      />

      {confirming && !reporting && (
        <div
          className="absolute bg-[rgba(0,0,0,0.5)] inset-0 overflow-hidden pointer-events-auto rounded-[28px] z-[10]"
          data-ai-recording-stop-confirm
          data-name="遮罩"
          data-node-id="3712:34657"
        >
          <div
            className="-translate-x-1/2 -translate-y-1/2 absolute bg-white content-stretch flex flex-col items-start left-1/2 rounded-[8px] top-1/2 w-[273px]"
            data-node-id="3712:34658"
          >
            <div className="content-stretch flex items-center justify-center py-[28px] w-full">
              <p className="font-['PingFang_SC:Medium',sans-serif] leading-normal text-[14px] text-[rgba(0,0,0,0.9)] text-center whitespace-nowrap">
                请确认是否立即停止服务记录？
              </p>
            </div>
            <div className="border-[rgba(0,0,0,0.1)] border-solid border-t content-stretch flex h-[44px] items-center relative w-full">
              <button
                className="appearance-none bg-transparent border-0 cursor-pointer flex flex-1 h-full items-center justify-center p-0"
                onClick={onCancelStop}
                type="button"
              >
                <span className="font-['PingFang_SC:Medium',sans-serif] leading-[20px] opacity-90 text-[14px] text-black text-center tracking-[0.8533px]">
                  否
                </span>
              </button>
              <span className="bg-[rgba(0,0,0,0.1)] h-full w-px" />
              <button
                aria-label="确认停止并进入报告生成流程"
                className="appearance-none bg-transparent border-0 cursor-pointer flex flex-1 h-full items-center justify-center p-0"
                data-ai-recording-confirm-stop
                onClick={onConfirmStop}
                type="button"
              >
                <span className="font-['PingFang_SC:Medium',sans-serif] leading-[20px] text-[#576b95] text-[14px] text-center tracking-[0.8533px]">
                  是
                </span>
              </button>
            </div>
          </div>
          <motion.span
            animate={shouldReduceMotion ? { opacity: 0.25 } : { opacity: [0.12, 0.38, 0.12] }}
            aria-hidden="true"
            className="absolute bg-[#8cf97e] h-[44px] left-[160px] pointer-events-none rounded-br-[8px] top-[362px] w-[136.5px]"
            data-name="闪烁"
            data-node-id="3707:34065"
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
            }
          />
        </div>
      )}
    </div>
  );
}

function EventStartPrototypePanel({
  onDetailsActivate,
  onPassportActivate,
  onScanComplete,
  phase,
  scanRunId,
  shouldReduceMotion,
}: {
  onDetailsActivate: () => void;
  onPassportActivate: () => void;
  onScanComplete: (runId: number) => void;
  phase: EventStartPhase;
  scanRunId: number;
  shouldReduceMotion: boolean;
}) {
  const prototypeStep: EventStartStep = phase === "passport" ? 0 : phase === "recording" ? 3 : 1;
  const item = EVENT_START_STEPS[prototypeStep];
  const activeSteps = getActiveEventSteps(phase);
  const showsPassportInteraction = phase === "passport";
  const prototypeSrc = phase === "details" ? ASSETS.eventStartPrototypes[2] : item.prototypeSrc;
  const prototypeAlt = phase === "details" ? EVENT_START_STEPS[2].prototypeAlt : item.prototypeAlt;
  const prototypeNodeId =
    phase === "scanning" ? "3553:38404" : phase === "details" ? "3553:38407" : item.prototypeNodeId;

  return (
    <div
      aria-labelledby={activeSteps.map((step) => `petmind-event-start-flow-${step + 1}`).join(" ")}
      className="bg-[rgba(226,226,226,0.5)] border border-[#d2d2d2] border-solid content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px overflow-clip relative rounded-[8px]"
      data-event-start-phase={phase}
      id="petmind-event-start-prototype"
      role="region"
      style={
        showsPassportInteraction
          ? {
              cursor: `url("${ASSETS.specialCursor}") 31 31, url("${ASSETS.specialCursorFallback}") 31 31, auto`,
            }
          : undefined
      }
    >
      <div className="content-stretch flex gap-[10px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full">
        <ActorIcons actors={[item.prototypeActor]} />
        <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] whitespace-nowrap">
          {item.prototypeRole}
        </p>
        <p className="font-['OPPOSans:Light',sans-serif] leading-[20px] text-[#1a1c1c] text-[11px] whitespace-nowrap">
          {item.prototypeDescription}
        </p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px px-[16px] py-[12px] relative rounded-bl-[8px] rounded-br-[8px] w-full">
        <div
          className="h-[692px] relative shrink-0 w-[320px]"
          data-event-start-prototype
          data-node-id={prototypeNodeId}
        >
          <img
            alt={prototypeAlt}
            className="absolute block inset-0 max-w-none object-cover pointer-events-none size-full"
            draggable={false}
            height={692}
            src={prototypeSrc}
            width={320}
          />
          {showsPassportInteraction && (
            <>
              <button
                aria-label="进入员工扫码并确认服务信息"
                className="absolute appearance-none bg-transparent border-0 cursor-[inherit] hover:bg-[rgba(140,249,126,0.15)] h-[325px] left-[24px] p-0 rounded-[20px] top-[153px] w-[272px] z-[1]"
                data-passport-hotspot
                onClick={onPassportActivate}
                type="button"
              />
              <motion.img
                alt=""
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0, 1] }}
                aria-hidden="true"
                className="absolute block h-[337px] left-[18px] max-w-none pointer-events-none top-[147px] w-[284px] z-[2]"
                data-passport-blink
                draggable={false}
                src={ASSETS.passportBlink}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
                }
              />
            </>
          )}
          {phase === "scanning" && (
            <EventStartScanPrototype onComplete={onScanComplete} runId={scanRunId} />
          )}
          {phase === "details" && (
            <EventStartDetailsPrototype
              onActivate={onDetailsActivate}
              shouldReduceMotion={shouldReduceMotion}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function WorkflowCard({
  title,
  actors,
  active = false,
  activeBackground = EVENT_START_SELECTED_CARD_BACKGROUND,
  activeHeaderBackground,
  actorIconGap = 2,
  children,
  className = "",
  bodyClassName = "",
  disabled = false,
  hovered = false,
  interactiveLabel,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  onSelect,
  recognitionGroup,
  style,
}: {
  title: string;
  actors: readonly Actor[];
  active?: boolean;
  activeBackground?: string;
  activeHeaderBackground?: string;
  actorIconGap?: number;
  children?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  disabled?: boolean;
  hovered?: boolean;
  interactiveLabel?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onSelect?: () => void;
  recognitionGroup?: AiRecognitionGroup;
  style?: React.CSSProperties;
}) {
  const highlighted = active || hovered;

  return (
    <div
      aria-disabled={disabled || undefined}
      className={`border-0 content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] shrink-0 w-full ${
        disabled ? "cursor-not-allowed" : ""
      } ${className}`}
      data-ai-recognition-card={recognitionGroup}
      style={{
        ...(active ? { backgroundImage: activeBackground } : {}),
        boxShadow: highlighted ? WORKFLOW_SELECTED_CENTER_STROKE : WORKFLOW_DEFAULT_CENTER_STROKE,
        ...style,
      }}
    >
      {(onSelect || disabled) && (
        <button
          aria-label={interactiveLabel ?? title}
          aria-pressed={active}
          className={`absolute appearance-none bg-transparent border-0 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#92a3c9] focus-visible:outline-offset-[-2px] inset-0 p-0 rounded-[8px] z-[10] ${
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          data-ai-recognition-group={recognitionGroup}
          disabled={disabled}
          onBlur={onBlur}
          onClick={disabled ? undefined : onSelect}
          onFocus={onFocus}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          tabIndex={disabled ? -1 : undefined}
          type="button"
        />
      )}
      <div
        className={`content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full ${
          active ? "" : disabled ? "bg-[rgba(210,210,210,0.5)]" : "bg-[#e2e2e2]"
        }`}
        style={
          active
            ? {
                backgroundImage:
                  activeHeaderBackground ??
                  "linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)",
              }
            : undefined
        }
      >
        {hovered && !active && (
          <span aria-hidden="true" className="absolute bg-[rgba(67,100,176,0.1)] inset-0 pointer-events-none" />
        )}
        <ActorIcons actors={actors} gap={actorIconGap} />
        <p
          className={`[word-break:break-word] font-['OPPOSans:${active ? "Bold" : "Medium"}',sans-serif] leading-[20px] text-[12px] whitespace-nowrap ${
            active ? "text-white" : disabled ? "opacity-65 text-[#474747]" : "opacity-80 text-[#474747]"
          }`}
        >
          {title}
        </p>
      </div>
      {children && (
        <div
          className={`content-stretch flex flex-col gap-[8px] items-start justify-center pb-[8px] pt-[10px] relative shrink-0 w-full ${bodyClassName}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function FlowDown({ label }: { label?: string }) {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-center relative shrink-0 w-full">
      <img alt="" aria-hidden="true" className="block h-[18px] shrink-0 w-[14px]" draggable={false} src={ASSETS.flowDown} />
      {label && (
        <span className="font-['OPPOSans:Light',sans-serif] leading-[20px] ml-[12px] opacity-60 text-[#474747] text-[11px] whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}

function PassportPanel({ showPassport = true, className = "" }: { showPassport?: boolean; className?: string }) {
  return (
    <div
      className={`bg-[rgba(226,226,226,0.5)] border border-[#d2d2d2] border-solid content-stretch flex flex-col items-start min-w-px overflow-clip relative rounded-[8px] ${className}`}
    >
      <div className="content-stretch flex gap-[10px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full">
        <ActorIcons actors={["owner"]} />
        <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] whitespace-nowrap">宠主护照</p>
        <p className="font-['OPPOSans:Light',sans-serif] leading-[20px] text-[#1a1c1c] text-[11px] whitespace-nowrap">宠主展示既有护照码</p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px relative rounded-bl-[8px] rounded-br-[8px] w-full">
        {showPassport && (
          <div className="aspect-[750/1624] h-full relative shrink-0">
            <img alt="Luna 的宠物护照码" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" draggable={false} src={ASSETS.passport} />
          </div>
        )}
      </div>
    </div>
  );
}

function StageOne({
  dispatch,
  interaction,
  shouldReduceMotion,
}: {
  dispatch: React.Dispatch<EventStartInteractionAction>;
  interaction: EventStartInteractionState;
  shouldReduceMotion: boolean;
}) {
  const [focusedStep, setFocusedStep] = useState<EventStartStep>(0);
  const [hoveredSteps, setHoveredSteps] = useState<readonly EventStartStep[]>([]);
  const flowCardRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeSteps = getActiveEventSteps(interaction.phase);

  const focusEventStep = (nextStep: EventStartStep) => {
    setFocusedStep(nextStep);
    flowCardRefs.current[nextStep]?.focus();
  };

  const activateEventStep = (nextStep: EventStartStep) => {
    setFocusedStep(nextStep);
    dispatch({ type: "ACTIVATE_STEP", step: nextStep, reducedMotion: shouldReduceMotion });
  };

  const handleFlowKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusEventStep(((index + 1) % EVENT_START_STEPS.length) as EventStartStep);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusEventStep(((index + EVENT_START_STEPS.length - 1) % EVENT_START_STEPS.length) as EventStartStep);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusEventStep(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusEventStep(3);
    }
  };

  return (
    <div
      aria-label="事件开启流程"
      aria-orientation="vertical"
      className="content-stretch flex flex-col h-full items-start relative rounded-[8px] shrink-0 w-[380px]"
      data-node-id="3465:29943"
      role="toolbar"
    >
      {EVENT_START_STEPS.map((item, index) => (
        <React.Fragment key={item.title}>
          <EventStartFlowCard
            buttonRef={(node) => {
              flowCardRefs.current[index] = node;
            }}
            focused={focusedStep === index}
            hovered={hoveredSteps.includes(index as EventStartStep)}
            index={index}
            item={item}
            onKeyDown={(event) => handleFlowKeyDown(event, index)}
            onPointerEnter={() => setHoveredSteps(getLinkedEventSteps(index as EventStartStep))}
            onPointerLeave={() => setHoveredSteps([])}
            onSelect={() => activateEventStep(index as EventStartStep)}
            selected={activeSteps.includes(index as EventStartStep)}
          />
          {index < EVENT_START_STEPS.length - 1 && <FlowDown />}
        </React.Fragment>
      ))}
    </div>
  );
}

function RecordingPrototypePanel({
  mode,
  onAdvanceToReviewSend,
  onCancelStop,
  onConfirmStop,
  onPrimaryAction,
  onSupplementReport,
  recognitionView,
  recordingPlaybackRef,
  reportPhase,
  resetToken,
  shouldReduceMotion,
  stage,
}: {
  mode: RecordingPrototypeMode;
  onAdvanceToReviewSend: () => void;
  onCancelStop: () => void;
  onConfirmStop: () => void;
  onPrimaryAction: () => void;
  onSupplementReport: () => void;
  recognitionView: AiRecognitionGroup;
  recordingPlaybackRef: RecordingPlaybackRef;
  reportPhase: AiReportPhase;
  resetToken: number;
  shouldReduceMotion: boolean;
  stage: 0 | 1;
}) {
  const aiRecognition = stage === 1;

  return (
    <div
      aria-labelledby={aiRecognition ? "petmind-assistant-stage-tab-2" : "petmind-event-start-flow-4"}
      className="bg-[rgba(226,226,226,0.5)] border border-[#d2d2d2] border-solid content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px overflow-hidden relative rounded-[8px]"
      data-ai-recognition-prototype={aiRecognition ? "" : undefined}
      data-event-start-phase={aiRecognition ? undefined : "recording"}
      data-node-id={aiRecognition ? "3474:32147" : "3470:31190"}
      id="petmind-event-start-prototype"
      role="region"
    >
      <div
        className="content-stretch flex gap-[10px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full"
        data-node-id={aiRecognition ? "3474:32148" : undefined}
      >
        <ActorIcons actors={["employee"]} />
        <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] whitespace-nowrap">
          员工端 ｜ 员工小程序
        </p>
        <span className="flex-[1_0_0] h-[20px] min-w-px overflow-hidden relative">
          <motion.span
            animate={{ opacity: aiRecognition && recognitionView === "report" ? 0 : 1, y: aiRecognition && recognitionView === "report" ? -4 : 0 }}
            className="absolute font-['OPPOSans:Light',sans-serif] inset-y-0 leading-[20px] left-0 text-[#1a1c1c] text-[11px] whitespace-nowrap"
            initial={false}
            transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: RECORDING_UI_EASE }}
          >
            {aiRecognition ? "智喵陪伴全程服务记录" : "服务准备，待开启"}
          </motion.span>
          {aiRecognition && (
            <motion.span
              animate={{ opacity: recognitionView === "report" ? 1 : 0, y: recognitionView === "report" ? 0 : 4 }}
              className="absolute font-['OPPOSans:Light',sans-serif] inset-y-0 leading-[20px] left-0 text-[#1a1c1c] text-[11px] whitespace-nowrap"
              initial={false}
              transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: RECORDING_UI_EASE }}
            >
              服务结束，生成执行回执及洗护报告
            </motion.span>
          )}
        </span>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px px-[16px] py-[12px] relative rounded-bl-[8px] rounded-br-[8px] w-full">
        <div
          className="h-[692px] overflow-hidden relative rounded-[28px] shrink-0 w-[320px]"
          data-event-start-prototype
          data-node-id={aiRecognition ? "3615:23672" : "3470:31190"}
        >
          <img
            alt="员工端洗护服务执行与视频记录界面"
            className="absolute block inset-0 max-w-none object-cover pointer-events-none size-full"
            draggable={false}
            height={692}
            src={ASSETS.eventStartPrototypes[3]}
            width={320}
          />
          <EventStartRecordingPrototype
            mode={mode}
            onAdvanceToReviewSend={onAdvanceToReviewSend}
            onCancelStop={onCancelStop}
            onConfirmStop={onConfirmStop}
            onPrimaryAction={onPrimaryAction}
            onSupplementReport={onSupplementReport}
            playbackRef={recordingPlaybackRef}
            recognitionView={recognitionView}
            reportPhase={reportPhase}
            resetToken={resetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </div>
    </div>
  );
}

function StageTwo({
  onSelectGroup,
  selectedGroup,
}: {
  onSelectGroup: (group: AiRecognitionGroup) => void;
  selectedGroup: AiRecognitionGroup;
}) {
  const [hoveredGroup, setHoveredGroup] = useState<AiRecognitionGroup | null>(null);
  const evidenceSelected = selectedGroup === "evidence";
  const reportSelected = selectedGroup === "report";
  const reportNoteClassName = "!gap-[4px] !pb-[6px] [&>p:first-child]:leading-[14px] [&>p:first-child]:whitespace-nowrap [&>p:last-child]:leading-[16px]";
  const cardInteraction = (group: AiRecognitionGroup) => ({
    hovered: hoveredGroup === group,
    interactiveLabel: group === "evidence" ? "选择服务视频与执行证据流程" : "选择结构化事件与报告生成流程",
    onBlur: () => setHoveredGroup(null),
    onFocus: () => setHoveredGroup(group),
    onPointerEnter: () => setHoveredGroup(group),
    onPointerLeave: () => setHoveredGroup(null),
    onSelect: () => onSelectGroup(group),
    recognitionGroup: group,
  });

  return (
    <div
      aria-label="AI 识别流程"
      className="content-stretch flex flex-col h-full items-start justify-between relative rounded-[8px] shrink-0 w-[380px]"
      data-ai-recognition-flow
      role="group"
    >
        <WorkflowCard
          active={evidenceSelected}
          activeHeaderBackground="linear-gradient(90deg, rgba(255, 196, 141, 0.5) 0%, rgba(131, 199, 130, 0.4) 20%, rgba(153, 118, 85, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)"
          actorIconGap={8}
          actors={["employee", "ai"]}
          className="h-[136px]"
          title="服务视频＋订单执行清单写入"
          {...cardInteraction("evidence")}
        >
          <div className="px-[16px]"><CardSummary active={evidenceSelected}>视频持续写入同一事件，清单提供应执行项目范围</CardSummary></div>
          <div className="px-[8px] w-full">
            <div className={`content-stretch flex flex-col gap-[6px] items-start justify-center overflow-hidden px-[10px] py-[8px] rounded-[4px] text-justify w-full ${evidenceSelected ? "bg-[rgba(67,100,176,0.05)] text-[#35508d]" : "bg-[rgba(26,28,28,0.03)] text-[#151616]"}`}>
              <p className={`font-['OPPOSans:Medium',sans-serif] leading-[14px] text-[11px] whitespace-nowrap ${evidenceSelected ? "opacity-75" : "opacity-60"}`}>预配置生效：商户服务配置</p>
              <p className={`font-['OPPOSans:Regular',sans-serif] leading-[14px] text-[10px] whitespace-nowrap ${evidenceSelected ? "opacity-75" : "opacity-60"}`}>加载本次已购项目，告诉 AI 应该关注哪些服务</p>
            </div>
          </div>
        </WorkflowCard>
        <FlowDown />
        <WorkflowCard
          active={evidenceSelected}
          activeHeaderBackground="linear-gradient(90deg, rgba(131, 199, 130, 0.5) 0%, rgba(255, 141, 178, 0.4) 20%, rgba(153, 118, 85, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)"
          actorIconGap={8}
          actors={["ai", "owner"]}
          bodyClassName="!pb-0"
          className="h-[188px]"
          title="AI 提取关键画面与执行证据"
          {...cardInteraction("evidence")}
        >
          <div className="px-[16px]"><CardSummary active={evidenceSelected}>识别项目完成线索、关键片段和异常观察，不独立判定最终履约质量</CardSummary></div>
          <div className="grid gap-[8px] h-[48px] px-[8px] w-full" style={{ gridTemplateColumns: "170px 186px" }}>
            {[
              ["预配置生效：商户服务配置", "项目完成标准决定什么算有效证据"],
              ["预配置生效：观察与描述标准", "观察标准决定提取哪些关键点和异常"],
            ].map(([title, description]) => (
              <div
                className={`content-stretch flex flex-col gap-[4px] h-[48px] items-start overflow-hidden pb-[6px] pt-[8px] px-[10px] rounded-[4px] ${evidenceSelected ? "bg-[rgba(67,100,176,0.05)] text-[#35508d]" : "bg-[rgba(26,28,28,0.03)] text-[#151616]"}`}
                key={title}
              >
                <p className={`font-['OPPOSans:Medium',sans-serif] leading-[14px] text-[11px] whitespace-nowrap ${evidenceSelected ? "opacity-75" : "opacity-60"}`}>{title}</p>
                <p className={`font-['OPPOSans:Regular',sans-serif] leading-[16px] text-[10px] whitespace-nowrap ${evidenceSelected ? "opacity-75" : "opacity-60"}`}>{description}</p>
              </div>
            ))}
          </div>
          <div className="grid h-[54px] mt-0 w-full" style={{ gridTemplateColumns: "127px 112px 141px" }}>
            {[
              ["已识别完成项", "存在较明确完成证据"],
              ["过程执行中项", "当前任务仍在拍摄"],
              ["待员工确认项", "未识别到明确完成证据"],
            ].map(([title, description], index) => (
              <div
                className={`border-0 flex flex-col gap-[8px] pb-[8px] pt-[12px] ${
                  index === 0 ? "pl-[16px] pr-[12px]" : index === 1 ? "px-[12px]" : "pl-[12px] pr-[16px]"
                }`}
                key={title}
                style={{ boxShadow: WORKFLOW_EVIDENCE_CENTER_STROKE }}
              >
                <p className={`font-['OPPOSans:Medium',sans-serif] leading-[12px] text-[11px] whitespace-nowrap ${evidenceSelected ? "opacity-75 text-[#35508d]" : "opacity-60 text-[#474747]"}`}>{title}</p>
                <p className={`font-['OPPOSans:Regular',sans-serif] leading-[14px] text-[11px] whitespace-nowrap ${evidenceSelected ? "opacity-75 text-[#35508d]" : "opacity-60 text-[#474747]"}`}>{description}</p>
              </div>
            ))}
          </div>
        </WorkflowCard>
        <FlowDown />
        <WorkflowCard
          active={reportSelected}
          activeHeaderBackground="linear-gradient(90deg, rgba(131, 199, 130, 0.5) 0%, rgba(64, 97, 63, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)"
          actorIconGap={8}
          actors={["ai"]}
          className="h-[136px]"
          title="结构化服务事件"
          {...cardInteraction("report")}
        >
          <div className="px-[16px]"><CardSummary active={reportSelected}>完成项目｜可能遗漏项目｜异常观察｜关键照片／片段</CardSummary></div>
          <div className="px-[8px] w-full">
            <ConfigNote active={reportSelected} title="预配置生效：观察与描述标准">统一完成项目、异常位置、程度、行为表现和关键片段的字段结构</ConfigNote>
          </div>
        </WorkflowCard>
        <FlowDown />
        <WorkflowCard
          active={reportSelected}
          activeHeaderBackground="linear-gradient(90deg, rgba(131, 199, 130, 0.5) 0%, rgba(255, 196, 141, 0.4) 20%, rgba(153, 118, 85, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)"
          actorIconGap={8}
          actors={["employee", "ai"]}
          className="h-[150px]"
          title="AI 提取关键画面与执行证据生成报告"
          {...cardInteraction("report")}
        >
          <div className="px-[16px] whitespace-nowrap" data-ai-report-card-summary><CardSummary active={reportSelected}>等待员工核对服务完成情况与现场事实</CardSummary></div>
          <div className="grid grid-cols-2 gap-[8px] px-[8px] w-full" data-ai-report-configuration-notes>
            <ConfigNote active={reportSelected} className={reportNoteClassName} title="预配置生效：商户服务配置">商户配置提供报告结构</ConfigNote>
            <ConfigNote active={reportSelected} className={reportNoteClassName} title="预配置生效：平台风险边界">限制文案不得直接判定未履约或输出医疗诊断</ConfigNote>
          </div>
        </WorkflowCard>
    </div>
  );
}

function StageOneTwoBridge({
  onAdvanceToAiRecognition,
  onAdvanceToReviewSend,
  recordingPlaybackRef,
  stage,
}: {
  onAdvanceToAiRecognition: () => void;
  onAdvanceToReviewSend: () => void;
  recordingPlaybackRef: RecordingPlaybackRef;
  stage: 0 | 1;
}) {
  const [interaction, dispatch] = useReducer(
    eventStartInteractionReducer,
    INITIAL_EVENT_START_INTERACTION,
  );
  const [recordingMode, setRecordingMode] = useState<RecordingPrototypeMode>("recording");
  const [aiRecognitionGroup, setAiRecognitionGroup] = useState<AiRecognitionGroup>("evidence");
  const [reportPhase, setReportPhase] = useState<AiReportPhase>("recording");
  const [recordingResetToken, setRecordingResetToken] = useState(0);
  const reportTimersRef = useRef<number[]>([]);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const prototypeStep: EventStartStep =
    interaction.phase === "passport" ? 0 : interaction.phase === "recording" ? 3 : 1;
  const showsPersistentRecording = stage === 1 || interaction.phase === "recording";
  const visibleRecordingMode: RecordingPrototypeMode = stage === 0 ? "ready" : recordingMode;

  const startRecordingAndAdvance = () => {
    setRecordingMode("recording");
    onAdvanceToAiRecognition();
  };

  const clearReportTimers = () => {
    reportTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    reportTimersRef.current = [];
  };

  const selectAiRecognitionGroup = (group: AiRecognitionGroup) => {
    clearReportTimers();
    setRecordingMode("recording");
    setAiRecognitionGroup(group);

    if (group === "evidence") {
      setReportPhase("recording");
      recordingPlaybackRef.current = { capturedAt: performance.now(), currentTime: 0 };
      setRecordingResetToken((token) => token + 1);
      return;
    }

    setReportPhase(AI_REPORT_PHASE_SEQUENCE[0]);
    if (shouldReduceMotion) {
      setReportPhase(AI_REPORT_PHASE_SEQUENCE[2]);
      return;
    }

    reportTimersRef.current = [
      window.setTimeout(
        () => setReportPhase(AI_REPORT_PHASE_SEQUENCE[1]),
        AI_REPORT_COLLAPSE_DURATION_MS,
      ),
      window.setTimeout(
        () => setReportPhase(AI_REPORT_PHASE_SEQUENCE[2]),
        AI_REPORT_COMPLETE_DELAY_MS,
      ),
    ];
  };

  useEffect(
    () => () => {
      reportTimersRef.current.forEach((timer) => window.clearTimeout(timer));
    },
    [],
  );

  return (
    <div
      className="content-stretch flex flex-[1_0_0] gap-[24px] h-[756px] items-start min-h-px relative w-[864px]"
      data-node-id={stage === 0 ? EVENT_START_STEPS[prototypeStep].frameNodeId : "3474:32156"}
      data-stage-one-two-bridge
    >
      {stage === 0 ? (
        <StageOne
          dispatch={dispatch}
          interaction={interaction}
          shouldReduceMotion={shouldReduceMotion}
        />
      ) : (
        <StageTwo
          onSelectGroup={selectAiRecognitionGroup}
          selectedGroup={aiRecognitionGroup}
        />
      )}

      {showsPersistentRecording ? (
        <RecordingPrototypePanel
          mode={visibleRecordingMode}
          onAdvanceToReviewSend={onAdvanceToReviewSend}
          onCancelStop={() => setRecordingMode("recording")}
          onConfirmStop={() => selectAiRecognitionGroup("report")}
          onPrimaryAction={
            stage === 0 ? startRecordingAndAdvance : () => setRecordingMode("confirm")
          }
          onSupplementReport={onAdvanceToReviewSend}
          recognitionView={stage === 1 ? aiRecognitionGroup : "evidence"}
          recordingPlaybackRef={recordingPlaybackRef}
          reportPhase={stage === 1 ? reportPhase : "recording"}
          resetToken={recordingResetToken}
          shouldReduceMotion={shouldReduceMotion}
          stage={stage}
        />
      ) : (
        <EventStartPrototypePanel
          onDetailsActivate={() => dispatch({ type: "ACTIVATE_DETAILS" })}
          onPassportActivate={() =>
            dispatch({ type: "ACTIVATE_PASSPORT_HOTSPOT", reducedMotion: shouldReduceMotion })
          }
          onScanComplete={(runId) => dispatch({ type: "SCAN_COMPLETE", runId })}
          phase={interaction.phase}
          scanRunId={interaction.scanRunId}
          shouldReduceMotion={shouldReduceMotion}
        />
      )}
    </div>
  );
}

function ReviewSendReportStats({ complete }: { complete: boolean }) {
  return (
    <div className="content-stretch flex gap-[6px] h-[46px] items-center relative shrink-0 w-full">
      {[
        ["8个", "服务项目", "缺少2个项目证据"],
        ["7个", "关键片段", "包含1个异常片段"],
      ].map(([count, title, description]) => (
        <div
          className="backdrop-blur-[1.704px] bg-[rgba(255,255,255,0.25)] content-stretch flex flex-col gap-[2px] items-start px-[10px] py-[6px] rounded-[10px] shrink-0 text-white whitespace-nowrap"
          key={title}
        >
          <span className="content-stretch flex font-['PingFang_SC:Semibold',sans-serif] gap-[3.409px] items-start text-[8.52px]">
            <span className="leading-[14.525px]">{count}</span>
            <span className="leading-[14.525px]">{title}</span>
          </span>
          <span className="font-['PingFang_SC:Regular',sans-serif] leading-[11.931px] opacity-60 text-[7.67px] text-center">
            {description}
          </span>
        </div>
      ))}
      <div
        className={`backdrop-blur-[1.704px] content-stretch flex flex-[1_0_0] flex-col gap-[2px] h-full items-start min-w-px px-[10px] py-[6px] rounded-[10px] text-white ${
          complete ? "bg-[rgba(140,249,126,0.25)]" : "bg-[rgba(255,152,152,0.25)]"
        }`}
      >
        <span className="content-stretch flex font-['PingFang_SC:Semibold',sans-serif] gap-[3.409px] items-start text-[10px] whitespace-nowrap">
          <span className="leading-[17.044px]">3项</span>
          <span className="leading-[17.044px]">待补充确认</span>
        </span>
        <span className="content-stretch flex flex-[1_0_0] items-center justify-between min-h-px w-full">
          {complete ? (
            <img
              alt="三项均已补充"
              className="block h-[10px] w-[36px]"
              draggable={false}
              src={ASSETS.reviewSendProgressComplete}
            />
          ) : (
            <span className="content-stretch flex gap-[3px] items-center">
              {[0, 1, 2].map((dot) => (
                <span className="bg-[rgba(255,255,255,0.25)] rounded-[2px] size-[10px]" key={dot} />
              ))}
            </span>
          )}
          <span className="font-['PingFang_SC:Regular',sans-serif] leading-[14px] opacity-60 text-[9px] text-center whitespace-nowrap">
            {complete ? "3/3" : "0/3"}
          </span>
        </span>
      </div>
    </div>
  );
}

function ReviewSendReportPage({
  complete,
}: {
  complete: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px]">
      <img
        alt="AI 服务报告"
        className="absolute block inset-0 max-w-none size-full"
        draggable={false}
        height={692}
        src={ASSETS.aiRecognitionReportShell}
        width={320}
      />
      <div className="absolute content-stretch flex flex-col gap-[10px] h-[467px] items-start left-[10px] top-[140px] w-[300px]">
        <ReviewSendReportStats complete={complete} />
        <div className="[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-[1_0_0] min-h-px overscroll-contain overflow-x-hidden overflow-y-auto relative touch-pan-y w-[300px]">
          <div className="h-[883px] relative shrink-0 w-[300px]">
            <img
              alt={complete ? "已补充的 AI 服务报告内容" : "待补充的 AI 服务报告内容"}
              className="absolute block inset-0 max-w-none size-full"
              decoding="sync"
              draggable={false}
              loading="eager"
              src={complete ? ASSETS.reviewSendReportContentConfirmed : ASSETS.aiRecognitionReportContent}
            />
          </div>
        </div>
      </div>
      <div
        aria-hidden={!complete}
        className="absolute bg-[#8cf97e] content-stretch flex h-[40px] items-center justify-center left-[167px] rounded-[20px] top-[621px] w-[139px]"
        style={{
          display: complete ? "flex" : "none",
        }}
      >
        <span className="font-['PingFang_SC:Semibold',sans-serif] leading-[18px] text-[#101010] text-[14px] text-center whitespace-nowrap">
          确认
        </span>
      </div>
    </div>
  );
}

function ReviewSendActionSheet({
  onSelectAlbum,
  shouldReduceMotion,
}: {
  onSelectAlbum: () => void;
  shouldReduceMotion: boolean;
}) {
  const entranceTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.46, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div
      className="absolute bg-[rgba(0,0,0,0.5)] inset-0 overflow-hidden rounded-[28px]"
      data-review-send-sheet-entrance
    >
      <motion.div
        animate={{ y: 0 }}
        className="absolute bottom-0 h-[273px] left-0 right-0"
        initial={shouldReduceMotion ? false : { y: 273 }}
        transition={entranceTransition}
      >
        <img
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 h-[170px] left-0 max-w-none w-[320px]"
          draggable={false}
          src={ASSETS.reviewSendActionSheetBackground}
        />
        <div className="absolute bg-white h-[48px] left-0 rounded-tl-[10.227px] rounded-tr-[10.227px] top-0 w-full">
          <span className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[18px] left-0 right-0 text-[13px] text-[rgba(0,0,0,0.9)] text-center top-[15px]">相机拍摄</span>
        </div>
        {[
          ["从相册选择", 48],
          ["从录制选取", 96],
          ["文字细节补充", 144],
        ].map(([label, top]) => (
          <div className="absolute bg-white h-[48px] left-0 w-full" key={label} style={{ top }}>
            <span className="absolute bg-black bottom-0 h-px left-0 opacity-10 right-0" />
            <span className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[18px] left-0 right-0 text-[13px] text-[rgba(0,0,0,0.9)] text-center top-[15px]">{label}</span>
          </div>
        ))}
        <div className="absolute bg-[#f2f2f2] h-[5px] left-0 top-[192px] w-full" />
        <div className="absolute bg-white bottom-0 h-[76px] left-0 w-full">
          <span className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[18px] left-0 right-0 text-[13px] text-[rgba(0,0,0,0.9)] text-center top-[20px]">取消</span>
          <span className="absolute bg-black bottom-[7.67px] h-[4.261px] left-1/2 rounded-[100px] -translate-x-1/2 w-[114.197px]" />
        </div>
        <button
          aria-label="从相册选择补充洗护报告证据"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[49px] left-[10px] p-0 rounded-[4px] top-[47px] w-[301px]"
          onClick={onSelectAlbum}
          type="button"
        >
          <motion.span
            animate={shouldReduceMotion ? { opacity: 0.5 } : { opacity: [0.3, 0.72, 0.3] }}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[4px]"
            style={{ boxShadow: "0 0 0 4px #8cf97e, inset 0 0 0 4px #8cf97e" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
            }
          />
        </button>
      </motion.div>
    </div>
  );
}

function ReviewSendReceiptConfirmedCard() {
  return (
    <div className="absolute bg-[#f5fbf9] border-[0.5px] border-[rgba(74,104,70,0.5)] border-solid bottom-[22px] content-stretch flex gap-[8px] h-[52px] items-center left-[14px] pl-[6px] rounded-bl-[4px] rounded-br-[2px] rounded-tl-[4px] rounded-tr-[4px] w-[216px]">
      <span className="overflow-hidden relative rounded-[6px] shrink-0 size-[40px]">
        <img
          alt="Luna"
          className="absolute inset-0 max-w-none object-cover rounded-[6px] size-full"
          draggable={false}
          src={ASSETS.aiReceiptReportCat}
        />
      </span>
      <span className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] h-full items-start justify-center min-w-px pt-[4px] relative">
        <span className="content-stretch flex gap-[6px] items-center relative shrink-0 w-full">
          <img alt="LUNA" className="block h-[12px] w-[29.998px]" draggable={false} src={ASSETS.reviewSendReceiptTitleConfirmed} />
          <img alt="07/22 洗护报告" className="block h-[10px] w-[76px]" draggable={false} src={ASSETS.reviewSendReceiptSubtitleConfirmed} />
        </span>
        <span className="font-['PingFang_SC:Regular',sans-serif] leading-[18px] opacity-50 text-[#4a6846] text-[10px] whitespace-nowrap">
          报告编号：260722A045
        </span>
      </span>
      <img alt="" aria-hidden="true" className="absolute left-[200.5px] size-[15px] top-[36.5px]" draggable={false} src={ASSETS.reviewSendReceiptCornerConfirmed} />
      <span className="absolute bg-[#4a6846] content-stretch flex h-[12px] items-center justify-center px-[4px] right-[-0.5px] rounded-bl-[4px] rounded-br-[1px] rounded-tl-[1px] rounded-tr-[4px] top-[-0.5px]">
        <img alt="已确认" className="block h-[6.5px] w-[20px]" draggable={false} src={ASSETS.reviewSendReceiptBadgeConfirmed} />
      </span>
    </div>
  );
}

function ReviewSendReceiptPage({
  onConfirmPush,
  shouldReduceMotion,
}: {
  onConfirmPush: () => void;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px]">
      <img
        alt="员工端洗护服务执行界面"
        className="absolute block inset-0 max-w-none object-cover size-full"
        draggable={false}
        height={692}
        src={ASSETS.eventStartPrototypes[3]}
        width={320}
      />
      <div className="absolute bg-[#70c765] h-[48px] left-[13px] rounded-bl-[10px] rounded-br-[10px] rounded-tl-[20px] rounded-tr-[20px] top-[89px] w-[294px]" />
      <div className="absolute bg-[#141414] h-[8px] left-[27px] rounded-[4px] top-[113px] w-[266px]" />
      <div className="absolute h-[451px] left-[38px] overflow-hidden top-[114px] w-[244px]">
        <img
          alt="洗护服务收据"
          className="absolute inset-0 max-w-none size-full"
          draggable={false}
          src={ASSETS.aiRecognitionReceipt}
        />
        <ReviewSendReceiptConfirmedCard />
      </div>
      <div className="absolute content-stretch flex gap-[13.635px] items-center left-[14px] top-[621px] w-[292px]">
        <div className="backdrop-blur-[12px] bg-[rgba(255,255,255,0.05)] content-stretch flex h-[40px] items-center justify-center rounded-[20px] shadow-[inset_0_0_8px_rgba(255,255,255,0.05)] shrink-0 w-[96px]">
          <span className="font-['PingFang_SC:Medium',sans-serif] leading-[18px] text-[14px] text-center text-white whitespace-nowrap">补充增项</span>
        </div>
        <button
          aria-label="确认推送洗护报告"
          className="appearance-none bg-[#8cf97e] border-0 cursor-pointer flex flex-[1_0_0] h-[40px] items-center justify-center min-w-px p-0 relative rounded-[20px]"
          onClick={onConfirmPush}
          type="button"
        >
          <span className="font-['PingFang_SC:Semibold',sans-serif] leading-[18.749px] text-[#101010] text-[14px] text-center whitespace-nowrap">确认推送</span>
          <motion.span
            animate={shouldReduceMotion ? { opacity: 0.5 } : { opacity: [0.3, 0.72, 0.3] }}
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[20px]"
            style={{ boxShadow: "0 0 0 4px rgba(255,255,255,0.5), inset 0 0 0 4px rgba(255,255,255,0.5)" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
            }
          />
        </button>
      </div>
    </div>
  );
}

function PassportWritePrototype({
  active,
  onNotificationActivate,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  onNotificationActivate?: () => void;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [islandPhase, setIslandPhase] = useState<PassportIslandPhase>("compact");
  const notificationVisible = islandPhase === "notification";
  const wideVisible = islandPhase !== "compact";
  const islandLeft =
    islandPhase === "notification" ? 9.71 : islandPhase === "wide" ? 10 : 110;
  const cameraLeft =
    islandPhase === "notification" ? 174 : islandPhase === "wide" ? 184 : 74;

  useEffect(() => {
    if (!active) {
      setIslandPhase("compact");
      return;
    }

    if (shouldReduceMotion) {
      setIslandPhase("notification");
      return;
    }

    setIslandPhase("compact");
    const wideTimer = window.setTimeout(
      () => setIslandPhase("wide"),
      PASSPORT_ISLAND_WIDE_START_MS,
    );
    const notificationTimer = window.setTimeout(
      () => setIslandPhase("notification"),
      PASSPORT_ISLAND_NOTIFICATION_START_MS,
    );

    return () => {
      window.clearTimeout(wideTimer);
      window.clearTimeout(notificationTimer);
    };
  }, [active, resetToken, shouldReduceMotion]);

  const islandTransition = shouldReduceMotion
    ? { duration: 0 }
    : islandPhase === "wide"
      ? { duration: 0.3, ease: "easeOut" as const }
      : islandPhase === "notification"
        ? { duration: 0.2, ease: "easeOut" as const }
        : { duration: 0 };

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px]" data-passport-write-prototype>
      <img
        alt="宠主端手机主页"
        className="absolute block inset-0 max-w-none object-cover size-full"
        decoding="sync"
        draggable={false}
        height={692}
        loading="eager"
        src={ASSETS.reviewSendPassportOwnerHome}
        width={320}
      />
      <motion.div
        animate={{
          height: notificationVisible ? 78 : 30,
          left: islandLeft,
          width: wideVisible ? 300 : 100,
        }}
        className="absolute bg-black overflow-hidden rounded-[37.694px] top-[8px] z-[2]"
        data-passport-island-phase={islandPhase}
        initial={false}
        transition={islandTransition}
      >
        <motion.div
          animate={{
            height: notificationVisible ? 56 : 20,
            left: wideVisible ? 11 : 5,
            opacity: wideVisible ? 1 : 0,
            top: notificationVisible ? 11 : 5,
            width: notificationVisible ? 56 : 20,
          }}
          className="absolute"
          data-node-id="3803:41216"
          initial={false}
          transition={islandTransition}
        >
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 max-w-none object-contain size-full"
            draggable={false}
            src={ASSETS.reviewSendPassportPawSticker}
          />
        </motion.div>
        <motion.span
          animate={{ left: cameraLeft }}
          aria-hidden="true"
          className="absolute h-[15px] top-[7.5px] w-[14.173px]"
          data-node-id="3585:23948"
          initial={false}
          transition={islandTransition}
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none size-full"
            draggable={false}
            src={ASSETS.reviewSendPassportCameraLens1}
          />
          <img
            alt=""
            className="absolute h-[8.73px] left-[3.02px] max-w-none top-[3.135px] w-[8.133px]"
            draggable={false}
            src={ASSETS.reviewSendPassportCameraLens}
          />
          <img
            alt=""
            className="absolute h-[0.66px] left-[2.986px] max-w-none top-[7.17px] w-[8.202px] rotate-90"
            draggable={false}
            src={ASSETS.reviewSendPassportCameraLine}
          />
        </motion.span>
      </motion.div>
      <motion.img
        alt=""
        animate={{ opacity: notificationVisible ? 1 : 0 }}
        aria-hidden="true"
        className="absolute block h-[56px] left-[19.71px] max-w-none object-fill pointer-events-none top-[19px] w-[280px] z-[3]"
        data-node-id="3585:23949"
        draggable={false}
        initial={false}
        src={ASSETS.reviewSendPassportNotificationContainer}
        transition={islandTransition}
      />
      {notificationVisible && (
        <>
          <button
            aria-label="查看 Luna 的洗护报告"
            className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[78px] left-[10px] p-0 rounded-[37.694px] top-[8px] w-[300px] z-[5]"
            data-passport-island-hotspot
            onClick={onNotificationActivate}
            type="button"
          />
          <motion.img
            alt=""
            animate={shouldReduceMotion ? { opacity: 0.4 } : { opacity: [0.18, 0.6, 0.18] }}
            aria-hidden="true"
            className="absolute block left-[245.714px] max-w-none pointer-events-none size-[52.571px] top-[20.714px] z-[4]"
            draggable={false}
            src={ASSETS.reviewSendPassportNotificationBlink}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
            }
          />
        </>
      )}
    </div>
  );
}

function ReviewSendPrototype({
  onAdvanceToActionOrchestration,
  onConfirmPush,
  onPhaseChange,
  phase,
  resetToken,
  shouldReduceMotion,
}: {
  onAdvanceToActionOrchestration: () => void;
  onConfirmPush: () => void;
  onPhaseChange: (phase: ReviewSendPhase) => void;
  phase: ReviewSendPhase;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const sheetVisible = phase === "sheet";
  const albumVisible = phase === "album";
  const albumSelectedVisible = phase === "albumSelected";
  const reportCompleteVisible = phase === "reportComplete";
  const receiptVisible = phase === "receipt";
  const passportWriteVisible = phase === "passportWrite";

  useEffect(() => {
    const preloaders = [
      ASSETS.reviewSendPhotoPicker,
      ASSETS.reviewSendPhotoPickerSelected,
      ASSETS.reviewSendReportContentConfirmed,
      ASSETS.reviewSendPassportOwnerHome,
      ASSETS.reviewSendPassportPawSticker,
      ASSETS.reviewSendPassportNotificationContainer,
      ASSETS.reviewSendPassportCameraLens,
      ASSETS.reviewSendPassportCameraLens1,
      ASSETS.reviewSendPassportCameraLine,
      ASSETS.reviewSendPassportNotificationBlink,
    ].map((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      void image.decode().catch(() => undefined);
      return image;
    });

    return () => {
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, []);

  return (
    <div
      className="h-[692px] overflow-hidden relative rounded-[28px] shrink-0 w-[320px]"
      data-review-send-phase={phase}
      data-review-send-phone
    >
      <div
        aria-hidden={!sheetVisible && !reportCompleteVisible}
        className="absolute inset-0"
        data-review-send-layer="report"
        style={{
          animation: "none",
          display: sheetVisible || reportCompleteVisible ? "block" : "none",
          pointerEvents: reportCompleteVisible ? "auto" : "none",
          transition: "none",
        }}
      >
        <ReviewSendReportPage complete={reportCompleteVisible} />
        <button
          aria-label="确认补充后的 AI 洗护报告"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[40px] left-[167px] p-0 rounded-[20px] top-[621px] w-[139px]"
          onClick={() => onPhaseChange("receipt")}
          type="button"
        >
          <motion.span
            animate={
              reportCompleteVisible
                ? shouldReduceMotion
                  ? { opacity: 0.5 }
                  : { opacity: [0.3, 0.72, 0.3] }
                : { opacity: 0 }
            }
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[20px]"
            style={{ boxShadow: "0 0 0 4px rgba(255,255,255,0.5), inset 0 0 0 4px rgba(255,255,255,0.5)" }}
            transition={
              reportCompleteVisible && !shouldReduceMotion
                ? { duration: 0.8, ease: "easeInOut", repeat: Infinity }
                : { duration: 0 }
            }
          />
        </button>
      </div>

      <div
        aria-hidden={!albumVisible}
        className="absolute inset-0"
        data-review-send-layer="album"
        style={{
          animation: "none",
          display: albumVisible ? "block" : "none",
          pointerEvents: albumVisible ? "auto" : "none",
          transition: "none",
        }}
      >
        <img
          alt="最近项目相册"
          className="absolute block inset-0 max-w-none object-cover size-full"
          decoding="sync"
          draggable={false}
          loading="eager"
          src={ASSETS.reviewSendPhotoPicker}
        />
        <button
          aria-label="选择洗护报告补充照片"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer left-[243px] p-0 size-[72px] top-[543px]"
          onClick={() => onPhaseChange("albumSelected")}
          type="button"
        >
          <motion.span
            animate={
              albumVisible
                ? shouldReduceMotion
                  ? { opacity: 0.25 }
                  : { opacity: [0.12, 0.4, 0.12] }
                : { opacity: 0 }
            }
            aria-hidden="true"
            className="absolute bg-[#8cf97e] inset-[-3px] pointer-events-none"
            transition={
              albumVisible && !shouldReduceMotion
                ? { duration: 0.8, ease: "easeInOut", repeat: Infinity }
                : { duration: 0 }
            }
          />
        </button>
      </div>

      <div
        aria-hidden={!albumSelectedVisible}
        className="absolute inset-0"
        data-review-send-layer="album-selected"
        style={{
          animation: "none",
          display: albumSelectedVisible ? "block" : "none",
          pointerEvents: albumSelectedVisible ? "auto" : "none",
          transition: "none",
        }}
      >
        <img
          alt="已选择一张补充照片"
          className="absolute block inset-0 max-w-none object-cover size-full"
          decoding="sync"
          draggable={false}
          loading="eager"
          src={ASSETS.reviewSendPhotoPickerSelected}
        />
        <button
          aria-label="发送一张补充照片"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[43px] left-[241px] p-0 rounded-[8px] top-[621px] w-[74px]"
          onClick={() => onPhaseChange("reportComplete")}
          type="button"
        >
          <motion.span
            animate={
              albumSelectedVisible
                ? shouldReduceMotion
                  ? { opacity: 0.5 }
                  : { opacity: [0.3, 0.72, 0.3] }
                : { opacity: 0 }
            }
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[8px]"
            style={{ boxShadow: "0 0 0 4px #8cf97e, inset 0 0 0 4px #8cf97e" }}
            transition={
              albumSelectedVisible && !shouldReduceMotion
                ? { duration: 0.8, ease: "easeInOut", repeat: Infinity }
                : { duration: 0 }
            }
          />
        </button>
      </div>

      <div
        aria-hidden={!receiptVisible}
        className="absolute inset-0"
        data-review-send-layer="receipt"
        style={{
          animation: "none",
          display: receiptVisible ? "block" : "none",
          pointerEvents: receiptVisible ? "auto" : "none",
          transition: "none",
        }}
      >
        <ReviewSendReceiptPage onConfirmPush={onConfirmPush} shouldReduceMotion={shouldReduceMotion} />
      </div>

      <div
        aria-hidden={!passportWriteVisible}
        className="absolute inset-0"
        data-review-send-layer="passport-write"
        style={{
          animation: "none",
          display: passportWriteVisible ? "block" : "none",
          pointerEvents: passportWriteVisible ? "auto" : "none",
          transition: "none",
        }}
      >
        <PassportWritePrototype
          active={passportWriteVisible}
          onNotificationActivate={onAdvanceToActionOrchestration}
          resetToken={resetToken}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>

      <div
        aria-hidden={!sheetVisible}
        className="absolute inset-0"
        data-review-send-layer="sheet"
        style={{
          animation: "none",
          display: sheetVisible ? "block" : "none",
          pointerEvents: sheetVisible ? "auto" : "none",
          transition: "none",
        }}
      >
        <ReviewSendActionSheet
          key={`review-send-sheet-${resetToken}`}
          onSelectAlbum={() => onPhaseChange("album")}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </div>
  );
}

function StageThree({
  onAdvanceToActionOrchestration,
}: {
  onAdvanceToActionOrchestration: () => void;
}) {
  const [reviewSendGroup, setReviewSendGroup] = useState<ReviewSendGroup>("draft-review");
  const [hoveredReviewSendGroup, setHoveredReviewSendGroup] = useState<ReviewSendGroup | null>(null);
  const [reviewSendPhase, setReviewSendPhase] = useState<ReviewSendPhase>("sheet");
  const [reviewSendResetToken, setReviewSendResetToken] = useState(0);
  const shouldReduceMotion = Boolean(useReducedMotion());
  const draftReviewSelected = reviewSendGroup === "draft-review";
  const passportWriteSelected = reviewSendGroup === "passport-write";

  const selectReviewSendGroup = (group: ReviewSendGroup) => {
    setReviewSendGroup(group);
    setReviewSendPhase(group === "draft-review" ? "sheet" : "passportWrite");
    setReviewSendResetToken((token) => token + 1);
  };

  const reviewSendCardInteraction = (group: ReviewSendGroup) => ({
    hovered: hoveredReviewSendGroup === group,
    interactiveLabel:
      group === "draft-review"
        ? "选择 AI 报告草稿与员工复核流程"
        : "选择报告写入既有宠物护照流程",
    onBlur: () => setHoveredReviewSendGroup(null),
    onFocus: () => setHoveredReviewSendGroup(group),
    onPointerEnter: () => setHoveredReviewSendGroup(group),
    onPointerLeave: () => setHoveredReviewSendGroup(null),
    onSelect: () => selectReviewSendGroup(group),
  });

  const handleConfirmPush = () => {
    selectReviewSendGroup("passport-write");
  };

  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] h-[756px] items-start min-h-px relative w-[864px]">
      <div className="content-stretch flex flex-col h-full items-start relative rounded-[8px] shrink-0 w-[380px]">
        <WorkflowCard
          active={draftReviewSelected}
          activeHeaderBackground="linear-gradient(90deg, rgba(131, 199, 130, 0.5) 0%, rgba(64, 97, 63, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)"
          actorIconGap={8}
          actors={["ai"]}
          className="h-[154px]"
          title="AI 报告草稿＋证据索引"
          {...reviewSendCardInteraction("draft-review")}
        >
          <div className="px-[16px]"><CardSummary active={draftReviewSelected}>完成项目、关键片段、异常观察、摘要与后续建议</CardSummary></div>
          <div className="px-[8px] w-full">
            <ConfigNote active={draftReviewSelected} className="!gap-[6px]" title="预配置生效：平台风险边界">标记低可信项目、专业边界内容和异常风险提醒，提示哪些内容必须由员工确认</ConfigNote>
          </div>
        </WorkflowCard>
        <FlowDown />
        <WorkflowCard
          active={draftReviewSelected}
          activeHeaderBackground="linear-gradient(90deg, rgba(255, 196, 141, 0.5) 0%, rgba(153, 118, 85, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)"
          actorIconGap={8}
          actors={["employee"]}
          className="h-[138px]"
          title="员工复核 AI 识别结果"
          {...reviewSendCardInteraction("draft-review")}
        >
          <div className="px-[16px]"><CardSummary active={draftReviewSelected}>核对完成情况与现场事实，纠正误判、补充观察</CardSummary></div>
          <div className="px-[8px] w-full">
            <ConfigNote active={draftReviewSelected} className="!gap-[6px]" title="预配置生效：平台风险边界【核心】">决定哪些项目可以直接确认，哪些必须纠正、补充事实或升级人工处理</ConfigNote>
          </div>
        </WorkflowCard>
        <FlowDown />
        <WorkflowCard
          active={passportWriteSelected}
          activeHeaderBackground="linear-gradient(90deg, rgba(131, 199, 130, 0.5) 0%, rgba(255, 141, 178, 0.4) 20%, rgba(153, 118, 85, 0) 100%), linear-gradient(90deg, rgba(210, 210, 210, 0.5) 0%, rgba(210, 210, 210, 0.5) 100%), linear-gradient(90deg, rgb(67, 100, 176) 0%, rgb(67, 100, 176) 100%)"
          actorIconGap={8}
          actors={["ai", "owner"]}
          bodyClassName="!py-[16px]"
          className="h-[92px]"
          title="报告写入既有宠物护照"
          {...reviewSendCardInteraction("passport-write")}
        >
          <div className="px-[16px] whitespace-nowrap" data-review-send-passport-summary><CardSummary active={passportWriteSelected}>Luna 主链不再经过“报告发出 → 护照认领”。</CardSummary></div>
        </WorkflowCard>
      </div>
      <div
        aria-labelledby="petmind-assistant-stage-tab-3"
        className="bg-[rgba(226,226,226,0.5)] border border-[#d2d2d2] border-solid content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px overflow-hidden relative rounded-[8px]"
        data-review-send-prototype
        role="region"
      >
        <div className="content-stretch flex gap-[10px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full">
          <ActorIcons actors={[passportWriteSelected ? "owner" : "employee"]} />
          <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] whitespace-nowrap">
            {passportWriteSelected ? "宠主端 ｜ 宠物护照APP" : "员工端 ｜ 员工小程序"}
          </p>
          <p className="font-['OPPOSans:Light',sans-serif] leading-[20px] text-[#1a1c1c] text-[11px] whitespace-nowrap">
            {passportWriteSelected ? "收到照护报告消息通知" : "员工复核 AI 洗护报告"}
          </p>
        </div>
        <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px px-[16px] py-[12px] relative rounded-bl-[8px] rounded-br-[8px] w-full">
          <ReviewSendPrototype
            onAdvanceToActionOrchestration={onAdvanceToActionOrchestration}
            onConfirmPush={handleConfirmPush}
            onPhaseChange={setReviewSendPhase}
            phase={reviewSendPhase}
            resetToken={reviewSendResetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>
      </div>
    </div>
  );
}

function ActionHotspotPulse({
  color = "rgba(255,255,255,0.5)",
  insetOnly = false,
  maxOpacity = 0.78,
  minOpacity = 0.25,
  radius,
  reducedOpacity = 0.5,
  shouldReduceMotion,
  stroke = 3,
}: {
  color?: string;
  insetOnly?: boolean;
  maxOpacity?: number;
  minOpacity?: number;
  radius: number;
  reducedOpacity?: number;
  shouldReduceMotion: boolean;
  stroke?: number;
}) {
  return (
    <motion.span
      animate={
        shouldReduceMotion
          ? { opacity: reducedOpacity }
          : { opacity: [minOpacity, maxOpacity, minOpacity] }
      }
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      data-name="闪烁"
      style={{
        borderRadius: radius,
        boxShadow: insetOnly
          ? `inset 0 0 0 ${stroke}px ${color}`
          : `0 0 0 ${stroke}px ${color}, inset 0 0 0 ${stroke}px ${color}`,
      }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
      }
    />
  );
}

function ActionOwnerSwitch() {
  return (
    <span
      aria-hidden="true"
      className="relative block h-[20px] w-[36.75px] shrink-0 overflow-hidden rounded-[16.8px]"
    >
      <span className="absolute inset-0 rounded-[16.8px] bg-[#4a6846]" />
      <span className="absolute left-[calc(50%+8px)] top-1/2 flex w-[46.75px] -translate-x-1/2 -translate-y-1/2 items-center justify-between">
        <img
          alt=""
          className="block max-w-none size-[12.5px]"
          draggable={false}
          src={ASSETS.actionOwnerSwitchHandleLeft}
        />
        <img
          alt=""
          className="block max-w-none size-[12.5px]"
          draggable={false}
          src={ASSETS.actionOwnerSwitchHandleRight}
        />
      </span>
      <span className="absolute left-[18.87px] top-1/2 size-[15.75px] -translate-y-1/2 rounded-[13.2px] border-[0.625px] border-solid border-white bg-[#e2e2e2] shadow-[0px_0.5px_1px_-0.45px_rgba(0,0,0,0.54),0.375px_3.5px_3.375px_0.75px_rgba(0,0,0,0.22)]" />
      <span className="absolute inset-0 rounded-[inherit] shadow-[inset_0.25px_0px_1.5px_-0.45px_rgba(0,0,0,0.22),inset_0px_1.875px_1.125px_-1.05px_rgba(0,0,0,0.2)]" />
    </span>
  );
}

function ActionOwnerReportContent() {
  const playbackIndexes = [0, 1, 2, 3, 6, 7] as const;
  const playbackIndexSet = new Set<number>(playbackIndexes);
  const steps = [
    ["基础洗护套餐 1/5", "毛发梳理", "已完成 | 无备注", false],
    ["基础洗护套餐 2/5", "全身冲洗", "已完成 | 无备注", false],
    ["基础洗护套餐 3/5", "耳部清洁", "已完成 | 无备注", false],
    ["基础洗护套餐 4/5", "拉毛吹干", "已完成 | 有皮肤异常反馈", true],
    ["基础洗护套餐 5/5", "基础修剪", "已完成 | 无备注", false],
    ["洗护服务增项 1/3", "刷牙护理", "已完成 | 无备注", false],
    ["洗护服务增项 2/3", "修屁股", "已完成 | 无备注", false],
    ["洗护服务增项 3/3", "剃小脚", "已完成 | 无备注", false],
  ] as const;

  return (
    <div
      className="relative flex w-full flex-col items-center gap-[12px] px-[13px] pb-[12px] pt-[240px]"
      data-action-owner-info-container
      style={{ fontFeatureSettings: '"case" 1' }}
    >
      <h3 className="m-0 shrink-0 whitespace-nowrap text-center font-['SF_Pro_Text:Semibold','PingFang_SC:Semibold',sans-serif] text-[30px] font-bold leading-[40px] text-white">
        Luna · 洗护报告
      </h3>
      <section
        className="flex h-[329px] w-full shrink-0 flex-col items-start gap-[14px] overflow-hidden rounded-[20px] p-[14px] font-['PingFang_SC:Regular',sans-serif] text-[10px] text-white backdrop-blur-[27.271px]"
        data-action-owner-main-container
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 100%), linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)",
        }}
      >
        <div className="flex h-[74px] w-[266px] shrink-0 flex-col gap-[8px]">
          <div className="flex h-[33px] w-full gap-[8px]">
            <div className="flex flex-1 flex-col items-start gap-[2px]">
              <span className="mix-blend-overlay whitespace-nowrap text-[rgba(255,255,255,0.7)] leading-[13px]">服务对象</span>
              <span className="leading-[17.044px]">Luna</span>
            </div>
            <div className="flex flex-1 flex-col items-start gap-[2px]">
              <span className="mix-blend-overlay whitespace-nowrap text-[rgba(255,255,255,0.7)] leading-[13px]">执行专员</span>
              <span className="leading-[17.044px]">晓华</span>
            </div>
          </div>
          <div className="flex h-[33px] w-full gap-[8px]">
            <div className="flex flex-1 flex-col items-start gap-[2px]">
              <span className="mix-blend-overlay whitespace-nowrap text-[rgba(255,255,255,0.7)] leading-[13px]">报告时间</span>
              <span className="whitespace-nowrap leading-[17.044px]">2026/07/28 14:32</span>
            </div>
            <div className="flex flex-1 flex-col items-start gap-[2px]">
              <span className="mix-blend-overlay whitespace-nowrap text-[rgba(255,255,255,0.7)] leading-[13px]">执行时间</span>
              <span className="whitespace-nowrap leading-[17.044px]">2026/07/28 13:00-14:23</span>
            </div>
          </div>
        </div>
        <span aria-hidden="true" className="relative h-0 w-full shrink-0">
          <img alt="" className="absolute left-0 top-1/2 h-[0.682px] w-full max-w-none -translate-y-1/2" draggable={false} src={ASSETS.actionOwnerReportDivider} />
        </span>
        <div className="flex h-[72px] w-full shrink-0 flex-col gap-[6px]">
          <div className="flex flex-col items-start gap-[2px]">
            <span className="mix-blend-overlay whitespace-nowrap text-[rgba(255,255,255,0.7)] leading-[13px]">执行套餐</span>
            <span className="whitespace-nowrap leading-[17.044px]">3-5kg 猫咪 基础健康洗护套餐</span>
          </div>
          <div className="flex flex-col items-start gap-[2px]">
            <span className="mix-blend-overlay whitespace-nowrap text-[rgba(255,255,255,0.7)] leading-[13px]">执行增项</span>
            <span className="whitespace-pre-wrap leading-[17.044px]">刷牙护理  |  修屁股  |  剃小脚</span>
          </div>
        </div>
        <span aria-hidden="true" className="relative h-0 w-full shrink-0">
          <img alt="" className="absolute left-0 top-1/2 h-[0.682px] w-full max-w-none -translate-y-1/2" draggable={false} src={ASSETS.actionOwnerReportDivider} />
        </span>
        <div className="flex h-[99px] w-full shrink-0 flex-col items-start gap-[6px]">
          <div className="flex w-full flex-col items-start gap-[2px]">
            <span className="mix-blend-overlay w-full text-[rgba(255,255,255,0.7)] leading-[13px]">报告概述</span>
            <p className="m-0 w-full text-justify leading-[17.044px]">
              本次基础洗护已完成。服务过程中观察到 Luna 腹部轻微泛红，并出现持续抓挠。建议您对Luna持续观察状态，如3天内未好转，请尽早咨询宠物医生。
            </p>
          </div>
          <p className="m-0 w-full text-justify font-['PingFang_SC:Light',sans-serif] text-[8px] leading-[13px] text-white opacity-50">
            报告仅作为本次洗护服务观察记录报告，并非医疗诊断，如有诊断需求，请联系宠物医生。
          </p>
        </div>
      </section>

      <section className="flex h-[448px] w-full shrink-0 flex-col items-start gap-[6px] text-white" data-action-owner-complete-info>
        <div className="flex h-[18px] w-full shrink-0 items-center gap-[6px] px-[4px]">
          <span className="size-[3.409px] shrink-0 rounded-[1.704px] bg-white" />
          <span className="flex-1 font-['PingFang_SC:Semibold',sans-serif] text-[10px] leading-[17.044px]">洗护完成情况</span>
        </div>
        <div
          className="flex h-[424px] w-full shrink-0 flex-col items-start overflow-hidden rounded-[20px] px-[14px] py-[4px] backdrop-blur-[27.271px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%), linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)",
          }}
        >
          {steps.map(([title, name, status, emphasized], index) => (
            <div
              className={`flex h-[52px] w-full shrink-0 items-center gap-[14px] pb-[8px] pt-[10px] ${
                index < steps.length - 1 ? "border-b-[0.852px] border-solid border-[rgba(255,255,255,0.2)]" : ""
              }`}
              key={title}
            >
              <div className="flex min-w-0 flex-1 flex-col items-start gap-[2px] font-['PingFang_SC:Regular',sans-serif]">
                <span className="w-full mix-blend-overlay text-[10px] leading-[14px] text-[rgba(255,255,255,0.7)]">{title}</span>
                <span className="flex w-full items-end gap-[6.818px] whitespace-nowrap text-center">
                  <span className="shrink-0 text-[13px] leading-[18px]">{name}</span>
                  <span className={`shrink-0 text-[10px] leading-[15px] ${emphasized ? "opacity-80" : "opacity-35"}`}>{status}</span>
                </span>
              </div>
              <span className="relative size-[32px] shrink-0 overflow-hidden rounded-[4px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover size-full" draggable={false} src={ASSETS.actionOwnerSteps[index]} />
                {playbackIndexSet.has(index) ? (
                  <img alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 max-w-none size-[13.636px] -translate-x-1/2 -translate-y-1/2" draggable={false} src={ASSETS.actionOwnerThumbnailPlay} />
                ) : null}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex h-[292px] w-full shrink-0 flex-col items-start gap-[6px] text-white" data-action-owner-exception-info>
        <div className="flex h-[18px] w-full shrink-0 items-center gap-[6px] px-[4px]">
          <span className="size-[3.409px] shrink-0 rounded-[1.704px] bg-white" />
          <span className="flex-1 font-['PingFang_SC:Semibold',sans-serif] text-[10px] leading-[17.044px]">特殊异常记录 01</span>
        </div>
        <div
          className="flex h-[268px] w-full shrink-0 flex-col items-start overflow-hidden rounded-[20px] px-[14px] py-[4px] backdrop-blur-[27.271px]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%), linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)",
          }}
        >
          {[
            [["异常位置", "腹部", false], ["异常程度", "轻微", false]],
            [["发现环节", "拉毛吹干", true], ["历史关联", "抓挠事件 06/29", true]],
            [["视觉表现", "局部泛红", false], ["行为表现", "持续抓挠", false]],
          ].map((cells, rowIndex) => (
            <div className="flex h-[52px] w-full shrink-0 items-start gap-[14px] border-b-[0.852px] border-solid border-[rgba(255,255,255,0.2)] pb-[8px] pt-[10px]" key={rowIndex}>
              {cells.map(([label, value, underlined]) => (
                <div className="flex min-w-0 flex-1 flex-col items-start gap-[1.704px] font-['PingFang_SC:Regular',sans-serif]" key={label as string}>
                  <span className="w-full mix-blend-overlay text-[8.52px] leading-[11.931px] text-[rgba(255,255,255,0.7)]">{label}</span>
                  <span className={`whitespace-nowrap text-center text-[11.08px] leading-[15.34px] ${underlined ? "underline [text-decoration-skip-ink:none] [text-underline-position:from-font]" : ""}`}>{value}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="flex h-[52px] w-full shrink-0 items-start gap-[14px] border-b-[0.852px] border-solid border-[rgba(255,255,255,0.2)] pb-[8px] pt-[10px]">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[1.704px] font-['PingFang_SC:Regular',sans-serif]">
              <span className="w-full mix-blend-overlay text-[8.52px] leading-[11.931px] text-[rgba(255,255,255,0.7)]">现场处理</span>
              <span className="whitespace-nowrap text-center text-[11.08px] leading-[15.34px]">避开敏感部位清洗，敏感部位清水处理。</span>
            </div>
          </div>
          <div className="flex h-[52px] w-full shrink-0 items-start gap-[14px] pb-[8px] pt-[10px]">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-[1.704px] font-['PingFang_SC:Regular',sans-serif]">
              <span className="w-full mix-blend-overlay text-[8.52px] leading-[11.931px] text-[rgba(255,255,255,0.7)]">执行建议</span>
              <span className="whitespace-nowrap text-center text-[11.08px] leading-[15.34px]">建议宠主持续观察，如严重及时就医。</span>
            </div>
          </div>
        </div>
      </section>

      <section className="flex h-[130px] w-full shrink-0 flex-col items-start gap-[6px] text-white" data-action-owner-recommendations>
        <div className="flex h-[18px] w-full shrink-0 items-center gap-[6px] px-[4px]">
          <span className="size-[3.409px] shrink-0 rounded-[1.704px] bg-white" />
          <span className="flex-1 font-['PingFang_SC:Semibold',sans-serif] text-[10px] leading-[17.044px]">智喵建议</span>
        </div>
        <div className="flex h-[106px] w-full shrink-0 flex-col items-start gap-[10px]">
          {[
            "[智喵]  持续一周观察记录皮肤状态",
            "[门店]  专员洗护后回访服务",
          ].map((label) => (
            <div
              className="flex h-[48px] w-full shrink-0 items-center justify-between overflow-hidden rounded-[20px] px-[13.635px] backdrop-blur-[27.271px]"
              key={label}
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%), linear-gradient(90deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%)",
              }}
            >
              <span className="whitespace-pre text-center font-['PingFang_SC:Regular',sans-serif] text-[12px] leading-[17.044px]">{label}</span>
              <ActionOwnerSwitch />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ActionOrchestrationOwnerPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<OwnerActionPhase>("splash");
  const reportScrollRef = useRef<HTMLDivElement>(null);
  const reportVisible = phase === "report";

  useEffect(() => {
    if (reportScrollRef.current) {
      reportScrollRef.current.scroll({ behavior: "auto", left: 0, top: 0 });
    }
    if (!active) {
      setPhase("splash");
      return;
    }
    if (shouldReduceMotion) {
      setPhase("report");
      return;
    }

    setPhase("splash");
    const timer = window.setTimeout(
      () => setPhase("report"),
      ACTION_OWNER_SPLASH_HOLD_SECONDS * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [active, resetToken, shouldReduceMotion]);

  const dissolveTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: ACTION_OWNER_REPORT_DISSOLVE_SECONDS, ease: "easeOut" as const };

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px]" data-action-owner-phase={phase}>
      <motion.img
        alt="宠物护照启动页"
        animate={{ opacity: reportVisible ? 0 : 1 }}
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        initial={false}
        src={ASSETS.actionOwnerSplash}
        transition={dissolveTransition}
      />
      <motion.div
        animate={{ opacity: reportVisible ? 1 : 0 }}
        className="absolute inset-0 overflow-hidden rounded-[28px]"
        initial={false}
        style={{ pointerEvents: reportVisible ? "auto" : "none" }}
        transition={dissolveTransition}
      >
        <img alt="Luna 宠物护照报告背景" className="absolute inset-0 max-w-none object-cover size-full" draggable={false} src={ASSETS.actionOwnerReportBackground} />
        <div
          className="absolute h-[508px] left-0 overflow-x-hidden overflow-y-auto overscroll-contain top-[94px] w-[320px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          data-action-owner-report-scroll
          ref={reportScrollRef}
        >
          <ActionOwnerReportContent />
        </div>
      </motion.div>
    </div>
  );
}

function ActionOrchestrationEmployeePrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<EmployeeActionPhase>("list");
  const phaseAssets: Record<EmployeeActionPhase, string> = {
    list: ASSETS.actionEmployeeNotificationList,
    message: ASSETS.actionEmployeeFollowUpMessage,
    compose: ASSETS.actionEmployeeFollowUpCompose,
    sent: ASSETS.actionEmployeeFollowUpSent,
  };

  useEffect(() => {
    setPhase("list");
  }, [active, resetToken]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px]" data-action-employee-phase={phase}>
      {(Object.keys(phaseAssets) as EmployeeActionPhase[]).map((item) => (
        <img
          alt="员工端回访任务流程"
          className="absolute inset-0 max-w-none object-cover size-full"
          draggable={false}
          key={item}
          src={phaseAssets[item]}
          style={{ display: phase === item ? "block" : "none" }}
        />
      ))}
      {phase === "list" && (
        <button
          aria-label="打开 Luna 回访消息"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[61px] left-[3px] p-0 rounded-[10px] top-[124px] w-[314px]"
          data-action-employee-list-hotspot
          onClick={() => setPhase("message")}
          type="button"
        >
          <ActionHotspotPulse radius={10} shouldReduceMotion={shouldReduceMotion} />
        </button>
      )}
      {phase === "message" && (
        <button
          aria-label="发起售后回访"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[33px] left-[239px] p-0 rounded-[8px] top-[580px] w-[66px]"
          data-action-employee-follow-up-hotspot
          onClick={() => setPhase("compose")}
          type="button"
        >
          <ActionHotspotPulse radius={8} shouldReduceMotion={shouldReduceMotion} />
        </button>
      )}
      {phase === "compose" && (
        <button
          aria-label="发送回访消息"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[30.6px] left-[270.45px] p-0 rounded-[28.8px] top-[629.45px] w-[30.6px]"
          data-action-employee-send-hotspot
          onClick={() => setPhase("sent")}
          type="button"
        >
          <ActionHotspotPulse radius={28.8} shouldReduceMotion={shouldReduceMotion} stroke={2} />
        </button>
      )}
    </div>
  );
}

function ActionMerchantCompletionContainer({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [completionPhase, setCompletionPhase] =
    useState<MerchantCompletionPhase>("conflict");
  const smartAnimateTransition = {
    duration: ACTION_MERCHANT_COMPLETION_SMART_ANIMATE_SECONDS,
    ease: "easeOut" as const,
  };

  useEffect(() => {
    if (!active) {
      setCompletionPhase("conflict");
      return;
    }

    if (shouldReduceMotion) {
      setCompletionPhase("next-task");
      return;
    }

    setCompletionPhase("conflict");
    const executedTimer = window.setTimeout(
      () => setCompletionPhase("executed"),
      ACTION_MERCHANT_COMPLETION_EXECUTED_DELAY_MS,
    );
    const nextTaskTimer = window.setTimeout(
      () => setCompletionPhase("next-task"),
      ACTION_MERCHANT_COMPLETION_NEXT_DELAY_MS,
    );

    return () => {
      window.clearTimeout(executedTimer);
      window.clearTimeout(nextTaskTimer);
    };
  }, [active, resetToken, shouldReduceMotion]);

  const showsConflict = completionPhase === "conflict";
  const showsExecuted = completionPhase === "executed";
  const showsNextTask = completionPhase === "next-task";

  return (
    <div
      className="absolute h-[126px] left-[122px] overflow-hidden pb-[8.5px] pl-[7px] pr-[10px] pt-[10px] top-[129px] w-[190px]"
      data-action-merchant-completion-phase={completionPhase}
    >
      <div className="h-[82px] overflow-hidden w-[173px]">
        <motion.div
          animate={{ x: showsNextTask ? -183 : 0 }}
          className="flex gap-[10px] h-[82px] w-[356px]"
          initial={false}
          transition={smartAnimateTransition}
        >
          <div className="bg-[rgba(255,255,255,0.6)] flex flex-col h-[82px] justify-between p-[7px] rounded-[7px] shadow-[0_0_10.224px_rgba(224,153,44,0.1)] shrink-0 w-[173px]">
            <motion.p
              animate={{ opacity: showsConflict ? 1 : 0.5 }}
              className="font-['PingFang_SC:Medium',sans-serif] leading-[17.04px] m-0 text-[10px] text-[rgba(78,47,0,0.6)]"
              initial={false}
              transition={smartAnimateTransition}
            >
              检测到 <b className="font-['PingFang_SC:Semibold',sans-serif] text-[#e0992c]">4笔</b> 服务订单有排班冲突风险，是否帮您一键重排？
            </motion.p>
            <div className="h-[27px] relative w-[159px]">
              <motion.span
                animate={{
                  backgroundColor: showsConflict ? "rgba(255,255,255,0)" : "rgba(224,153,44,0.8)",
                  borderColor: showsConflict ? "#f2e6d3" : "rgba(224,153,44,0)",
                  width: showsConflict ? 76 : 159,
                }}
                className="absolute border-[0.852px] border-solid flex h-[27px] items-center justify-center left-0 overflow-hidden rounded-[5px] top-0"
                initial={false}
                transition={smartAnimateTransition}
              >
                <motion.span
                  animate={{ opacity: showsConflict ? 1 : 0 }}
                  className="absolute text-[#e0992c] text-[10px] whitespace-nowrap"
                  initial={false}
                  transition={smartAnimateTransition}
                >
                  手动调班
                </motion.span>
                <motion.span
                  animate={{ opacity: showsExecuted || showsNextTask ? 1 : 0 }}
                  className="absolute flex gap-[4px] items-center text-[10px] text-white whitespace-nowrap"
                  initial={false}
                  transition={smartAnimateTransition}
                >
                  <img alt="" className="size-[10.224px]" draggable={false} src={ASSETS.actionMerchantExecutedCheck} />
                  已执行
                </motion.span>
              </motion.span>
              <motion.span
                animate={{ opacity: showsConflict ? 1 : 0 }}
                className="absolute bg-[rgba(224,153,44,0.8)] flex h-[27px] items-center justify-center right-0 rounded-[5px] text-[10px] text-white top-0 w-[76px]"
                initial={false}
                transition={smartAnimateTransition}
              >
                智能重排
              </motion.span>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.6)] flex flex-col h-[82px] justify-between p-[7px] rounded-[7px] shadow-[0_0_10.224px_rgba(224,153,44,0.1)] shrink-0 w-[173px]">
            <p className="font-['PingFang_SC:Medium',sans-serif] leading-[17.04px] m-0 text-[10px] text-[rgba(78,47,0,0.6)]">
              检测到 <b className="font-['PingFang_SC:Semibold',sans-serif] text-[#e0992c]">12笔</b> 服务订单有回任务未执行，是否帮您一键催办？
            </p>
            <div className="flex gap-[7px] h-[27px]">
              <span className="border-[0.852px] border-[#f2e6d3] border-solid flex h-[27px] items-center justify-center rounded-[5px] text-[#e0992c] text-[10px] w-[76px]">自行回访</span>
              <span className="bg-[rgba(224,153,44,0.8)] flex h-[27px] items-center justify-center rounded-[5px] text-[10px] text-white w-[76px]">智能催办</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute flex gap-[3.5px] h-[14px] items-center left-[7px] top-[103.5px] w-[173px]">
        <motion.span
          animate={{ height: showsNextTask ? 7 : 14, width: showsNextTask ? 7 : 14 }}
          className="relative shrink-0"
          initial={false}
          transition={smartAnimateTransition}
        >
          <motion.img
            alt=""
            animate={{ opacity: showsConflict ? 1 : 0 }}
            className="absolute inset-0 size-full"
            draggable={false}
            initial={false}
            src={ASSETS.actionMerchantProgressStep1Active}
            transition={smartAnimateTransition}
          />
          <motion.img
            alt=""
            animate={{ opacity: showsExecuted ? 1 : 0 }}
            className="absolute inset-0 size-full"
            draggable={false}
            initial={false}
            src={ASSETS.actionMerchantProgressStep1Executed}
            transition={smartAnimateTransition}
          />
          <motion.img
            alt=""
            animate={{ opacity: showsNextTask ? 1 : 0 }}
            className="absolute inset-0 size-full"
            draggable={false}
            initial={false}
            src={ASSETS.actionMerchantProgressStep1Complete}
            transition={smartAnimateTransition}
          />
        </motion.span>
        <img alt="" className="h-[1.704px] shrink-0 w-[39px]" draggable={false} src={ASSETS.actionMerchantProgressLine} />
        <motion.span
          animate={{ height: showsNextTask ? 14 : 7, width: showsNextTask ? 14 : 7 }}
          className="relative shrink-0"
          initial={false}
          transition={smartAnimateTransition}
        >
          <motion.img
            alt=""
            animate={{ opacity: showsNextTask ? 0 : 1 }}
            className="absolute inset-0 size-full"
            draggable={false}
            initial={false}
            src={ASSETS.actionMerchantProgressStepInactive}
            transition={smartAnimateTransition}
          />
          <motion.img
            alt=""
            animate={{ opacity: showsNextTask ? 1 : 0 }}
            className="absolute inset-0 size-full"
            draggable={false}
            initial={false}
            src={ASSETS.actionMerchantProgressStep2Active}
            transition={smartAnimateTransition}
          />
        </motion.span>
        {[0, 1].map((item) => (
          <React.Fragment key={item}>
            <img alt="" className="h-[1.704px] shrink-0 w-[39px]" draggable={false} src={ASSETS.actionMerchantProgressLine} />
            <img alt="" className="shrink-0 size-[7px]" draggable={false} src={ASSETS.actionMerchantProgressStepInactive} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function ActionOrchestrationMerchantPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<MerchantActionPhase>("dashboard");

  useEffect(() => {
    setPhase("dashboard");
  }, [active, resetToken]);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px]" data-action-merchant-phase={phase}>
      <img
        alt="商户云门店经营看板"
        className="absolute inset-0 max-w-none object-cover size-full"
        data-action-merchant-layer="initial"
        draggable={false}
        src={ASSETS.actionMerchantDashboardInitial}
        style={{ display: phase === "updated" ? "none" : "block" }}
      />
      <img
        alt="一键排班已生效的商户云门店经营看板"
        className="absolute inset-0 max-w-none object-cover size-full"
        data-action-merchant-layer="updated"
        draggable={false}
        src={ASSETS.actionMerchantDashboardUpdated}
        style={{ display: phase === "updated" ? "block" : "none" }}
      />
      <div
        aria-hidden={phase !== "dashboard"}
        className="absolute inset-0"
        style={{ animation: "none", display: phase === "dashboard" ? "block" : "none", transition: "none" }}
      >
        <button
          aria-label="智能重排冲突订单"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[32px] left-[217px] p-0 rounded-[8px] top-[185px] w-[81.5px]"
          data-action-merchant-reorder-hotspot
          onClick={() => setPhase("preview")}
          type="button"
        >
          <ActionHotspotPulse color="#8cf97e" radius={8} shouldReduceMotion={shouldReduceMotion} stroke={2.5} />
        </button>
      </div>
      <div
        aria-hidden={phase !== "preview"}
        className="absolute inset-0"
        data-action-merchant-layer="preview"
        style={{ animation: "none", display: phase === "preview" ? "block" : "none", transition: "none" }}
      >
        <div className="absolute bg-[rgba(0,0,0,0.5)] inset-0" />
        <img
          alt="执行结果预览"
          className="absolute h-[618px] left-0 max-w-none object-fill rounded-t-[20px] top-[74px] w-[320px]"
          draggable={false}
          src={ASSETS.actionMerchantResultPreview}
        />
        <button
          aria-label="取消一键排班"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[47px] left-[14px] p-0 rounded-[23.5px] top-[616px] w-[141px]"
          onClick={() => setPhase("dashboard")}
          type="button"
        />
        <button
          aria-label="确认一键排班"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[47px] left-[165px] p-0 rounded-[23.5px] top-[616px] w-[141px]"
          data-action-merchant-confirm-hotspot
          onClick={() => setPhase("updated")}
          type="button"
        >
          <ActionHotspotPulse color="#8cf97e" radius={23.5} shouldReduceMotion={shouldReduceMotion} stroke={2} />
        </button>
      </div>
      <div
        aria-hidden={phase !== "updated"}
        className="absolute inset-0"
        data-action-merchant-layer="completion"
        style={{ animation: "none", display: phase === "updated" ? "block" : "none", transition: "none" }}
      >
        <ActionMerchantCompletionContainer
          active={active && phase === "updated"}
          resetToken={resetToken}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    </div>
  );
}

function ActionOrchestrationPrototype({
  resetToken,
  selectedAction,
  shouldReduceMotion,
}: {
  resetToken: number;
  selectedAction: ActionOrchestrationRole;
  shouldReduceMotion: boolean;
}) {
  const headers: Record<ActionOrchestrationRole, { actors: readonly Actor[]; description: string; title: string }> = {
    owner: { actors: ["owner"], description: "查看报告与智能建议", title: "宠主端 ｜ 宠物护照APP" },
    employee: { actors: ["employee"], description: "回访任务流程", title: "员工端 ｜ 员工小程序" },
    merchant: { actors: ["merchant"], description: "回访任务超时转派", title: "商家端 | 商户云APP" },
  };
  const header = headers[selectedAction];

  useEffect(() => {
    [
      ASSETS.actionOwnerSplash,
      ASSETS.actionOwnerReportBackground,
      ...ASSETS.actionOwnerSteps,
      ASSETS.actionEmployeeNotificationList,
      ASSETS.actionEmployeeFollowUpMessage,
      ASSETS.actionEmployeeFollowUpCompose,
      ASSETS.actionEmployeeFollowUpSent,
      ASSETS.actionMerchantDashboardInitial,
      ASSETS.actionMerchantResultPreview,
      ASSETS.actionMerchantDashboardUpdated,
      ASSETS.actionMerchantExecutedCheck,
      ASSETS.actionMerchantProgressLine,
      ASSETS.actionMerchantProgressStep1Active,
      ASSETS.actionMerchantProgressStep1Complete,
      ASSETS.actionMerchantProgressStep1Executed,
      ASSETS.actionMerchantProgressStep2Active,
      ASSETS.actionMerchantProgressStepInactive,
    ].forEach((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      void image.decode().catch(() => undefined);
    });
  }, []);

  return (
    <div className="bg-[rgba(226,226,226,0.5)] border border-[#d2d2d2] border-solid flex flex-[1_0_0] flex-col h-[756px] min-w-px overflow-hidden relative rounded-[8px]">
      <div className="flex gap-[10px] h-[40px] items-center px-[16px] py-[6px] shrink-0 w-full">
        <ActorIcons actors={header.actors} />
        <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] m-0 opacity-80 text-[#474747] text-[12px] whitespace-nowrap">{header.title}</p>
        <p className="font-['OPPOSans:Light',sans-serif] leading-[20px] m-0 text-[#1a1c1c] text-[11px] whitespace-nowrap">{header.description}</p>
      </div>
      <div className="flex flex-1 items-center justify-center min-h-0 px-[16px] py-[12px]">
        <div className="h-[692px] overflow-hidden relative rounded-[28px] shrink-0 w-[320px]" data-action-orchestration-phone>
          <div className="absolute inset-0" style={{ display: selectedAction === "owner" ? "block" : "none" }}>
            <ActionOrchestrationOwnerPrototype active={selectedAction === "owner"} resetToken={resetToken} shouldReduceMotion={shouldReduceMotion} />
          </div>
          <div className="absolute inset-0" style={{ display: selectedAction === "employee" ? "block" : "none" }}>
            <ActionOrchestrationEmployeePrototype active={selectedAction === "employee"} resetToken={resetToken} shouldReduceMotion={shouldReduceMotion} />
          </div>
          <div className="absolute inset-0" style={{ display: selectedAction === "merchant" ? "block" : "none" }}>
            <ActionOrchestrationMerchantPrototype active={selectedAction === "merchant"} resetToken={resetToken} shouldReduceMotion={shouldReduceMotion} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionTaskInstructions({
  active,
  summary,
  items,
}: {
  active: boolean;
  summary: string;
  items: readonly string[];
}) {
  return (
    <div
      className={`[word-break:break-word] font-['OPPOSans:${active ? "Regular" : "Light"}',sans-serif] leading-[20px] px-[16px] text-[11px] text-justify w-full ${
        active ? "text-[#35508d]" : "text-[#1a1c1c]"
      }`}
      data-action-task-instructions
    >
      <CardSummary active={active}>{summary}</CardSummary>
      <ol className="list-decimal m-0 mt-[4px] pl-[16.5px] space-y-[4px]">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ol>
    </div>
  );
}

function StageFour() {
  const [selectedAction, setSelectedAction] = useState<ActionOrchestrationRole>("owner");
  const [hoveredAction, setHoveredAction] = useState<ActionOrchestrationRole | null>(null);
  const [actionResetToken, setActionResetToken] = useState(0);
  const shouldReduceMotion = Boolean(useReducedMotion());

  const selectAction = (action: ActionOrchestrationRole) => {
    setSelectedAction(action);
    setActionResetToken((token) => token + 1);
  };

  const actionCardInteraction = (action: ActionOrchestrationRole) => ({
    hovered: hoveredAction === action,
    interactiveLabel: `选择${action === "owner" ? "宠主" : action === "employee" ? "员工" : "商户"}行动`,
    onBlur: () => setHoveredAction(null),
    onFocus: () => setHoveredAction(action),
    onPointerEnter: () => setHoveredAction(action),
    onPointerLeave: () => setHoveredAction(null),
    onSelect: () => selectAction(action),
  });

  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[24px] h-[756px] items-start min-h-px relative w-[864px]">
      <div className="content-stretch flex flex-col h-[756px] items-start relative rounded-[8px] shrink-0 w-[380px]" data-action-orchestration-left>
        <div className="flex flex-col gap-[13px] h-[260px] shrink-0 w-full">
          <WorkflowCard
            actors={["ai"]}
            className="h-[78px]"
            disabled
            style={{ backgroundImage: "linear-gradient(rgba(210,210,210,0.25), rgba(210,210,210,0.25)), linear-gradient(#e4e4e4, #e4e4e4)" }}
            title="已确认服务事件＋已发送报告"
          >
            <div className="px-[16px]"><CardSummary>服务完成情况、异常观察与后续计划已经明确</CardSummary></div>
          </WorkflowCard>
          <WorkflowCard
            actors={["ai"]}
            bodyClassName="!gap-0 !p-0"
            className="h-[169px]"
            disabled
            style={{ backgroundImage: "linear-gradient(rgba(210,210,210,0.25), rgba(210,210,210,0.25)), linear-gradient(#e4e4e4, #e4e4e4)" }}
            title="AI 将后续建议编排为可执行任务"
          >
            <div className="px-[16px] py-[10px] w-full">
              <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[18px] m-0 text-[#1a1c1c] text-[11px] text-justify">
                为每项任务明确：谁执行、做什么、何时触发、在哪里完成，以及何时结束或转交人工。
              </p>
            </div>
            <img alt="" aria-hidden="true" className="block h-px shrink-0 w-full" draggable={false} src={ASSETS.actionConfigDividerHorizontal} />
            <div className="flex gap-[8px] items-start px-[8px] w-full" data-action-configuration-notes>
              <ConfigNote divided title="预配置生效：商户服务配置">提供建议服务周期、可推荐项目及商户可执行的服务窗口。</ConfigNote>
              <img alt="" aria-hidden="true" className="block h-[72px] self-stretch shrink-0 w-px" draggable={false} src={ASSETS.actionConfigDividerVertical} />
              <ConfigNote divided title="预配置生效：自动化规则">应用“洗护后 24 小时回访”等预设时间、渠道与结束条件。</ConfigNote>
            </div>
          </WorkflowCard>
        </div>
        <FlowDown />
        <div className="flex flex-col h-[448px] justify-between shrink-0 w-full">
          <WorkflowCard
            active={selectedAction === "owner"}
            activeHeaderBackground="linear-gradient(90deg, rgba(255,141,178,0.5) 0%, rgba(153,85,107,0) 100%), linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(210,210,210,0.5) 100%), linear-gradient(90deg, rgb(67,100,176) 0%, rgb(67,100,176) 100%)"
            actors={["owner"]}
            bodyClassName="!gap-0"
            className="h-[150px]"
            title="宠主行动"
            {...actionCardInteraction("owner")}
          >
            <ActionTaskInstructions
              active={selectedAction === "owner"}
              summary="在 Luna 的护照查看报告与计划，24小时后反馈 Luna 状态："
              items={[
                "反馈状态稳定／改善 → 本轮回访结束；",
                "反馈状态加重／出现异常 → 转员工跟进；",
                "逾期未反馈 → 再次提醒或转员工跟进；",
              ]}
            />
          </WorkflowCard>
          <WorkflowCard
            active={selectedAction === "employee"}
            activeHeaderBackground="linear-gradient(90deg, rgba(255,196,141,0.5) 0%, rgba(153,118,85,0) 100%), linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(210,210,210,0.5) 100%), linear-gradient(90deg, rgb(67,100,176) 0%, rgb(67,100,176) 100%)"
            actors={["employee"]}
            bodyClassName="!gap-0"
            className="h-[146px]"
            title="员工行动"
            {...actionCardInteraction("employee")}
          >
            <ActionTaskInstructions
              active={selectedAction === "employee"}
              summary="收到异常任务后（仅在加重、低可信或持续未回复时），人工回访并补充记录："
              items={[
                "回访并记录 → 任务结束；",
                "回访并认为需要专业判断 → 升级商户",
              ]}
            />
          </WorkflowCard>
          <WorkflowCard
            active={selectedAction === "merchant"}
            activeHeaderBackground="linear-gradient(90deg, rgba(120,161,255,0.5) 0%, rgba(255,196,141,0.45) 20%, rgba(153,118,85,0) 100%), linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(210,210,210,0.5) 100%), linear-gradient(90deg, rgb(67,100,176) 0%, rgb(67,100,176) 100%)"
            actorIconGap={8}
            actors={["merchant", "employee"]}
            bodyClassName="!gap-0"
            className="h-[126px]"
            title="商户行动"
            {...actionCardInteraction("merchant")}
          >
            <ActionTaskInstructions
              active={selectedAction === "merchant"}
              summary="监控异常、超时与复约机会，必要时改派："
              items={[
                "派发已处理 → 任务结束；",
                "派发无人处理 → 重新派单；",
              ]}
            />
          </WorkflowCard>
        </div>
      </div>
      <ActionOrchestrationPrototype resetToken={actionResetToken} selectedAction={selectedAction} shouldReduceMotion={shouldReduceMotion} />
    </div>
  );
}

function CompactBranchCard({
  active = false,
  actors,
  hovered = false,
  onBlur,
  onFocus,
  onPointerEnter,
  onPointerLeave,
  onSelect,
  title,
  children,
}: {
  active?: boolean;
  actors: readonly Actor[];
  hovered?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
  onSelect?: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const highlighted = active || hovered;

  return (
    <div
      className="border-0 content-stretch flex flex-col h-[78px] items-start min-w-0 overflow-clip relative rounded-[8px] shrink-0 w-[184px]"
      style={{
        ...(active ? { backgroundImage: EVENT_START_SELECTED_CARD_BACKGROUND } : {}),
        boxShadow: highlighted
          ? WORKFLOW_SELECTED_CENTER_STROKE
          : WORKFLOW_DEFAULT_CENTER_STROKE,
      }}
    >
      <button
        aria-label={title}
        aria-pressed={active}
        className="absolute appearance-none bg-transparent border-0 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#92a3c9] focus-visible:outline-offset-[-2px] inset-0 p-0 rounded-[8px] z-[5]"
        onBlur={onBlur}
        onClick={onSelect}
        onFocus={onFocus}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        type="button"
      />
      <div
        className={`content-stretch flex gap-[8px] h-[40px] items-center px-[14px] py-[6px] relative shrink-0 w-full ${
          active ? "" : "bg-[#e2e2e2]"
        }`}
        style={
          active
            ? {
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,141,178,0.5) 0%, rgba(153,118,85,0) 100%), linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(210,210,210,0.5) 100%), linear-gradient(90deg, rgb(67,100,176) 0%, rgb(67,100,176) 100%)",
              }
            : undefined
        }
      >
        {hovered && !active && (
          <span
            aria-hidden="true"
            className="absolute bg-[rgba(67,100,176,0.1)] inset-0 pointer-events-none"
          />
        )}
        <ActorIcons actors={actors} />
        <p
          className={`font-['OPPOSans:${active ? "Bold" : "Medium"}',sans-serif] leading-[20px] text-[12px] whitespace-nowrap ${
            active ? "text-white" : "opacity-80 text-[#474747]"
          }`}
        >
          {title}
        </p>
      </div>
      <div className="content-stretch flex flex-[1_0_0] items-center min-h-px pb-[8px] pt-[10px] px-[16px] relative w-full">
        <p
          className={`font-['OPPOSans:${active ? "Regular" : "Light"}',sans-serif] leading-[20px] text-[11px] whitespace-nowrap ${
            active ? "text-[#35508d]" : "text-[#1a1c1c]"
          }`}
        >
          {children}
        </p>
      </div>
    </div>
  );
}

function ReachRoutingObservationPhoto({ second = false }: { second?: boolean }) {
  return (
    <span className="block border-[0.853px] border-[rgba(31,31,31,0.25)] border-solid overflow-hidden relative rounded-[10px] shrink-0 size-[54px]">
      <img
        alt="宠主补充的皮肤状态照片"
        className="absolute inset-0 max-w-none object-cover rounded-[10px] size-full"
        draggable={false}
        src={second ? ASSETS.reachRoutingOwnerPhoto2 : ASSETS.reachRoutingOwnerPhoto1}
      />
    </span>
  );
}

function ReachRoutingObservationAvatar({ className = "" }: { className?: string }) {
  return (
    <span className={`absolute border-[1.5px] border-[rgba(255,255,255,0.5)] border-solid overflow-hidden rounded-[14px] size-[27px] ${className}`}>
      <img
        alt="宠主头像"
        className="absolute inset-0 max-w-none object-cover rounded-[14px] size-full"
        draggable={false}
        src={ASSETS.reachRoutingOwnerAvatar}
      />
    </span>
  );
}

function ReachRoutingObservationReportGroup() {
  return (
    <div className="h-[130px] relative w-[294px]">
      <p className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-[113.5px] m-0 opacity-50 text-[10px] text-white top-0 whitespace-nowrap">
        7月28日 14:03
      </p>
      <div className="absolute h-[111px] left-0 top-[19px] w-[294px]">
        <div className="absolute h-[36px] left-[54px] top-[7px] w-[240px]">
          <span className="absolute font-['PingFang_SC:Light',sans-serif] leading-[10px] left-0 opacity-50 text-[8px] text-white top-[13px] tracking-[0.64px]">
            14:03
          </span>
          <div className="absolute bg-[#525252] flex h-[36px] items-center justify-end left-[33px] px-[10px] rounded-bl-[7px] rounded-br-[7px] rounded-tl-[7px] rounded-tr-[2px] top-0 w-[207px]">
            <span className="font-['PingFang_SC:Regular',sans-serif] leading-[20px] text-[#d9d9d9] text-[11px] whitespace-nowrap">
              您的洗护服务已结束，洗护报告已送达
            </span>
          </div>
        </div>
        <div className="absolute bg-[rgba(255,255,255,0.05)] border-[0.853px] border-[rgba(255,255,255,0.05)] border-solid flex h-[54px] items-center left-[102px] pl-[5px] pr-[10px] rounded-[6px] top-[50px] w-[192px]">
          <img
            alt="Luna 洗护报告"
            className="block object-cover rounded-[4px] size-[44px]"
            draggable={false}
            src={ASSETS.reachRoutingReportCat}
          />
          <div className="flex flex-col gap-[4px] h-[44px] justify-center ml-[7px] min-w-0">
            <div className="flex h-[16px] items-center gap-[4px]">
              <span className="bg-white flex h-[12px] items-center justify-center px-[3px] rounded-[1.707px] w-[28.63px]">
                <img alt="LUNA" className="block h-[6.212px] w-[22.63px]" draggable={false} src={ASSETS.reachRoutingLuna} />
              </span>
              <img alt="" aria-hidden="true" className="block h-[6px] w-px" draggable={false} src={ASSETS.reachRoutingDivider} />
              <span className="font-['PingFang_SC:Medium',sans-serif] leading-[16px] text-[11px] text-white whitespace-nowrap">
                07/22 洗护报告
              </span>
            </div>
            <span className="font-['PingFang_SC:Regular',sans-serif] leading-[16px] opacity-50 text-[10px] text-white whitespace-nowrap">
              报告编号：260722A045
            </span>
          </div>
          <img
            alt=""
            aria-hidden="true"
            className="absolute bottom-[-0.47px] right-[-1px] size-[20.48px]"
            draggable={false}
            src={ASSETS.reachRoutingReportCorner}
          />
        </div>
      </div>
    </div>
  );
}

function ReachRoutingObservationQuestionGroup({
  hasEmployeeReply,
  hasOwnerAck,
  hasOwnerReply,
  transition,
}: {
  hasEmployeeReply: boolean;
  hasOwnerAck: boolean;
  hasOwnerReply: boolean;
  transition: { duration: number; ease: typeof REACH_ROUTING_EASING };
}) {
  return (
    <div className="h-[383px] relative w-[294px]">
      <p className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-[113.5px] m-0 opacity-50 text-[10px] text-white top-0 whitespace-nowrap">
        7月29日 13:24
      </p>
      <div className="absolute h-[98px] left-0 top-[19px] w-[294px]">
        <span className="absolute font-['PingFang_SC:Light',sans-serif] leading-[10px] left-0 opacity-50 text-[8px] text-white top-[44px] tracking-[0.64px]">
          13:24
        </span>
        <div className="absolute bg-[#525252] h-[84px] left-[33px] px-[10px] py-[8px] rounded-bl-[7px] rounded-br-[7px] rounded-tl-[7px] rounded-tr-[2px] top-[7px] w-[261px]">
          <div className="flex h-[15px] items-center gap-[4px]">
            <img alt="回访" className="block h-[8px] w-[16px]" draggable={false} src={ASSETS.reachRoutingFollowUpLabel} />
            <span className="font-['PingFang_SC:Regular',sans-serif] leading-[15px] opacity-50 text-[10px] text-white whitespace-nowrap">
              07/28 订单：260722A045
            </span>
          </div>
          <p className="font-['PingFang_SC:Regular',sans-serif] leading-[17px] m-0 mt-[2px] text-[#d9d9d9] text-[11px] text-justify w-[241px]">
            Luna 家长，昨天洗澡发现的泛红区域有没有好点？如果发现严重的话，建议早点来找医生看一下，先排除一下是否有感染。
          </p>
        </div>
      </div>

      <motion.div
        animate={{ opacity: hasOwnerReply ? 1 : 0, y: hasOwnerReply ? 0 : 8 }}
        className="absolute h-[65px] left-0 top-[124px] w-[294px]"
        initial={false}
        style={{ visibility: hasOwnerReply ? "visible" : "hidden" }}
        transition={transition}
      >
        <ReachRoutingObservationAvatar className="left-0 top-[7px]" />
        <p className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[17px] left-[40px] m-0 opacity-80 text-[11px] text-white text-justify top-[7px] w-[217.6px]">
          恢复一点了，没有昨天红。第一张昨天到家的，第二张今天晚上的，估计是自己抓到的？我再看看的
        </p>
      </motion.div>

      <motion.div
        animate={{ opacity: hasOwnerReply ? 1 : 0, y: hasOwnerReply ? 0 : 8 }}
        className="absolute h-[68px] left-0 top-[196px] w-[294px]"
        initial={false}
        style={{ visibility: hasOwnerReply ? "visible" : "hidden" }}
        transition={transition}
      >
        <ReachRoutingObservationAvatar className="left-0 top-[7px]" />
        <div className="absolute flex gap-[7px] left-[40px] top-[7px]">
          <ReachRoutingObservationPhoto />
          <ReachRoutingObservationPhoto second />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: hasEmployeeReply ? 1 : 0, y: hasEmployeeReply ? 0 : 8 }}
        className="absolute h-[64px] left-0 top-[271px] w-[294px]"
        initial={false}
        style={{ visibility: hasEmployeeReply ? "visible" : "hidden" }}
        transition={transition}
      >
        <span className="absolute font-['PingFang_SC:Light',sans-serif] leading-[10px] left-0 opacity-50 text-[8px] text-white top-[27px] tracking-[0.64px]">
          13:26
        </span>
        <div className="absolute bg-[#525252] h-[50px] left-[33.24px] px-[10px] py-[8px] rounded-bl-[7px] rounded-br-[7px] rounded-tl-[7px] rounded-tr-[2px] top-[7px] w-[260.76px]">
          <div className="flex h-[15px] items-center gap-[4px]">
            <img alt="回访" className="block h-[8px] w-[16px]" draggable={false} src={ASSETS.reachRoutingFollowUpLabel} />
            <span className="font-['PingFang_SC:Regular',sans-serif] leading-[15px] opacity-50 text-[10px] text-white whitespace-nowrap">
              07/28 订单：260722A045
            </span>
          </div>
          <p className="font-['PingFang_SC:Regular',sans-serif] leading-[17px] m-0 mt-[2px] text-[#d9d9d9] text-[11px] whitespace-nowrap">
            好的，那您再观察两三天哈，有问题随时联系我
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: hasOwnerAck ? 1 : 0, y: hasOwnerAck ? 0 : 8 }}
        className="absolute h-[41px] left-0 top-[342px] w-[294px]"
        initial={false}
        style={{ visibility: hasOwnerAck ? "visible" : "hidden" }}
        transition={transition}
      >
        <ReachRoutingObservationAvatar className="left-0 top-[7px]" />
        <span className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[17px] left-[40px] opacity-80 text-[11px] text-white top-[12px]">好</span>
      </motion.div>
    </div>
  );
}

function ReachRoutingNextFollowUpQuestionGroup({
  hasEmployeeReply,
  hasOwnerAck,
  hasOwnerReply,
  transition,
}: {
  hasEmployeeReply: boolean;
  hasOwnerAck: boolean;
  hasOwnerReply: boolean;
  transition: { duration: number; ease: typeof REACH_ROUTING_EASING };
}) {
  return (
    <div className="h-[383px] relative w-[294px]">
      <p className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-[113.5px] m-0 opacity-50 text-[10px] text-white top-0 whitespace-nowrap">
        7月29日 13:24
      </p>
      <div className="absolute h-[98px] left-0 top-[19px] w-[294px]">
        <span className="absolute font-['PingFang_SC:Light',sans-serif] leading-[10px] left-0 opacity-50 text-[8px] text-white top-[44px] tracking-[0.64px]">
          13:24
        </span>
        <div className="absolute bg-[#525252] h-[84px] left-[33px] px-[10px] py-[8px] rounded-bl-[7px] rounded-br-[7px] rounded-tl-[7px] rounded-tr-[2px] top-[7px] w-[261px]">
          <div className="flex h-[15px] items-center gap-[4px]">
            <img alt="回访" className="block h-[8px] w-[16px]" draggable={false} src={ASSETS.reachRoutingFollowUpLabel} />
            <span className="font-['PingFang_SC:Regular',sans-serif] leading-[15px] opacity-50 text-[10px] text-white whitespace-nowrap">
              07/28 订单：260722A045
            </span>
          </div>
          <p className="font-['PingFang_SC:Regular',sans-serif] leading-[17px] m-0 mt-[2px] text-[#d9d9d9] text-[11px] text-justify w-[241px]">
            Luna 家长，昨天洗澡发现的泛红区域有没有好点？如果发现严重的话，建议早点来找医生看一下，先排除一下是否有感染。
          </p>
        </div>
      </div>

      <motion.div
        animate={{ opacity: hasOwnerReply ? 1 : 0, y: hasOwnerReply ? 0 : 8 }}
        className="absolute h-[54px] left-0 top-[124px] w-[294px]"
        initial={false}
        style={{ visibility: hasOwnerReply ? "visible" : "hidden" }}
        transition={transition}
      >
        <ReachRoutingObservationAvatar className="left-0 top-[7px]" />
        <p className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[17px] left-[40px] m-0 opacity-80 text-[11px] text-white top-[7px] w-[217.6px]">
          感觉没啥区别，估计还得看一两天
        </p>
      </motion.div>

      <motion.div
        animate={{ opacity: hasOwnerReply ? 1 : 0, y: hasOwnerReply ? 0 : 8 }}
        className="absolute h-[68px] left-0 top-[174px] w-[294px]"
        initial={false}
        style={{ visibility: hasOwnerReply ? "visible" : "hidden" }}
        transition={transition}
      >
        <ReachRoutingObservationAvatar className="left-0 top-[7px]" />
        <div className="absolute left-[40px] top-[7px]">
          <ReachRoutingObservationPhoto />
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: hasEmployeeReply ? 1 : 0, y: hasEmployeeReply ? 0 : 8 }}
        className="absolute h-[82px] left-0 top-[242px] w-[294px]"
        initial={false}
        style={{ visibility: hasEmployeeReply ? "visible" : "hidden" }}
        transition={transition}
      >
        <span className="absolute font-['PingFang_SC:Light',sans-serif] leading-[10px] left-0 opacity-50 text-[8px] text-white top-[34px] tracking-[0.64px]">
          13:26
        </span>
        <div className="absolute bg-[#525252] left-[33.24px] px-[10px] py-[8px] rounded-bl-[7px] rounded-br-[7px] rounded-tl-[7px] rounded-tr-[2px] top-[7px] w-[260.76px]">
          <div className="flex h-[15px] items-center gap-[4px]">
            <img alt="回访" className="block h-[8px] w-[16px]" draggable={false} src={ASSETS.reachRoutingFollowUpLabel} />
            <span className="font-['PingFang_SC:Regular',sans-serif] leading-[15px] opacity-50 text-[10px] text-white whitespace-nowrap">
              07/28 订单：260722A045
            </span>
          </div>
          <p className="font-['PingFang_SC:Regular',sans-serif] leading-[17px] m-0 mt-[2px] text-[#d9d9d9] text-[11px]">
            好的，那您再观察下哈，如果有泛红严重或者持续这样，您得早点来找医生看看
          </p>
        </div>
      </motion.div>

      <motion.div
        animate={{ opacity: hasOwnerAck ? 1 : 0, y: hasOwnerAck ? 0 : 8 }}
        className="absolute h-[41px] left-0 top-[342px] w-[294px]"
        initial={false}
        style={{ visibility: hasOwnerAck ? "visible" : "hidden" }}
        transition={transition}
      >
        <ReachRoutingObservationAvatar className="left-0 top-[7px]" />
        <span className="absolute font-['PingFang_SC:Regular',sans-serif] leading-[17px] left-[40px] opacity-80 text-[11px] text-white top-[12px]">好</span>
      </motion.div>
    </div>
  );
}

function ReachRoutingObservationPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<ReachRoutingObservationPhase>("initial");
  const phaseIndex = REACH_ROUTING_OBSERVATION_PHASES.indexOf(phase);

  useEffect(() => {
    setPhase("initial");
    if (!active) return;
    if (shouldReduceMotion) {
      setPhase("closed");
      return;
    }

    const timers = REACH_ROUTING_OBSERVATION_SWITCH_MS.map((delay, index) =>
      window.setTimeout(() => {
        setPhase(REACH_ROUTING_OBSERVATION_PHASES[index + 1]);
      }, delay),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, resetToken, shouldReduceMotion]);

  const transition = {
    duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;
  const viewportHeight = [435, 382, 435, 435, 435][phaseIndex];
  const reportDateTop = [163, -37, -55, -103, -148][phaseIndex];
  const reportLayerTop = [182, -18, -36, -84, -129][phaseIndex];
  const questionDateTop = [306, 106, 88, 40, -5][phaseIndex];
  const questionLayerTop = [325, 125, 107, 59, 14][phaseIndex];
  const ownerReplyLayerTop = [430, 230, 212, 164, 119][phaseIndex];
  const employeeReplyLayerTop = [577, 377, 359, 311, 266][phaseIndex];
  const ownerAckLayerTop = [648, 448, 430, 382, 337][phaseIndex];
  const hasOwnerReply = phaseIndex >= 1;
  const hasEmployeeReply = phaseIndex >= 2;
  const hasOwnerAck = phaseIndex >= 3;
  const hasClosed = phaseIndex >= 4;

  return (
    <div
      className="bg-[#414141] h-[692px] overflow-clip relative rounded-[28px] w-[320px]"
      data-reach-routing-observation-phase={phase}
    >
      <img alt="本轮观察结束原型" className="absolute inset-0 max-w-none object-cover size-full" draggable={false} src={ASSETS.reachRoutingObservationBackground} />
      <motion.img
        alt="员工编辑下一次回访消息"
        animate={{ opacity: phase === "owner-reply" ? 1 : 0 }}
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        initial={false}
        src={ASSETS.reachRoutingObservationComposeBackground}
        transition={transition}
      />

      <motion.div
        animate={{ height: viewportHeight }}
        className="absolute left-0 overflow-hidden top-[182px] w-[320px]"
        initial={false}
        transition={transition}
      >
        <motion.p
          animate={{ opacity: phaseIndex === 0 ? 0.5 : 0, y: phaseIndex === 0 ? 0 : -8 }}
          className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-[126.5px] m-0 text-[10px] text-white top-[38.347px] whitespace-nowrap"
          initial={false}
          transition={transition}
        >
          7月28日 12:58
        </motion.p>
        <motion.img
          alt="到店签到与服务套餐图层"
          animate={{ opacity: phaseIndex === 0 ? 1 : 0, y: phaseIndex === 0 ? 0 : -8 }}
          className="absolute h-[92.667px] left-[13px] top-[57.347px] w-[294px]"
          data-reach-routing-observation-layer="check-in"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpCheckIn}
          transition={transition}
        />
        <motion.p
          animate={{ top: reportDateTop }}
          className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-[126.5px] m-0 opacity-50 text-[10px] text-white whitespace-nowrap"
          initial={false}
          transition={transition}
        >
          7月28日 14:03
        </motion.p>
        <motion.img
          alt="洗护服务结束与报告送达"
          animate={{ top: reportLayerTop }}
          className="absolute h-[111px] left-[13px] w-[294px]"
          data-reach-routing-observation-layer="report-delivered"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpReportDelivered}
          transition={transition}
        />
        <motion.p
          animate={{ top: questionDateTop }}
          className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-[126.5px] m-0 opacity-50 text-[10px] text-white whitespace-nowrap"
          initial={false}
          transition={transition}
        >
          7月29日 13:24
        </motion.p>
        <motion.img
          alt="员工回访问句"
          animate={{ top: questionLayerTop }}
          className="absolute h-[98px] left-[13px] w-[294px]"
          data-reach-routing-observation-layer="question"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpQuestion}
          transition={transition}
        />
        <motion.img
          alt="宠主反馈与两张现场照片"
          animate={{ opacity: hasOwnerReply ? 1 : 0, top: ownerReplyLayerTop, y: hasOwnerReply ? 0 : 8 }}
          className="absolute h-[140px] left-[13px] w-[294px]"
          data-reach-routing-observation-layer="owner-reply"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingObservationOwnerReply}
          transition={transition}
        />
        <motion.img
          alt="员工继续观察建议"
          animate={{ opacity: hasEmployeeReply ? 1 : 0, top: employeeReplyLayerTop, y: hasEmployeeReply ? 0 : 8 }}
          className="absolute h-[64px] left-[13px] w-[294px]"
          data-reach-routing-observation-layer="employee-reply"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingObservationEmployeeReply}
          transition={transition}
        />
        <motion.img
          alt="宠主确认继续观察"
          animate={{ opacity: hasOwnerAck ? 1 : 0, top: ownerAckLayerTop, y: hasOwnerAck ? 0 : 8 }}
          className="absolute h-[41px] left-[13px] w-[294px]"
          data-reach-routing-observation-layer="owner-ack"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpOwnerAck}
          transition={transition}
        />
        <motion.div
          animate={{ opacity: hasClosed ? 1 : 0, y: hasClosed ? 0 : 8 }}
          className="absolute h-[32px] left-[13px] text-center top-[391px] w-[294px]"
          initial={false}
          style={{ visibility: hasClosed ? "visible" : "hidden" }}
          transition={transition}
        >
          <p className="font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] m-0 opacity-50 text-[10px] text-white">8月01日 13:24</p>
          <p className="font-['SF_Pro_Text:Light',sans-serif] font-light leading-[13px] m-0 mt-[7px] opacity-50 text-[11px] text-white whitespace-nowrap">3日内无新增负反馈，判断洗护事件完结　<span className="text-[#8cf97e] underline">人工重启</span></p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ReachRoutingNextFollowUpPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] =
    useState<ReachRoutingNextFollowUpPhase>("initial");
  const phaseIndex = REACH_ROUTING_NEXT_FOLLOWUP_PHASES.indexOf(phase);

  useEffect(() => {
    setPhase("initial");
    if (!active) return;
    if (shouldReduceMotion) {
      setPhase(REACH_ROUTING_NEXT_FOLLOWUP_PHASES[REACH_ROUTING_NEXT_FOLLOWUP_PHASES.length - 1]);
      return;
    }

    const timers = REACH_ROUTING_NEXT_FOLLOWUP_SWITCH_MS.map((delay, index) =>
      window.setTimeout(() => {
        setPhase(REACH_ROUTING_NEXT_FOLLOWUP_PHASES[index + 1]);
      }, delay),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, resetToken, shouldReduceMotion]);

  const transition = {
    duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;
  const viewportHeight = [435, 382, 435, 435, 435][phaseIndex];
  const reportLayerTop = [182, -18, -36, -84, -129][phaseIndex];
  const questionLayerTop = [325, 125, 107, 59, 14][phaseIndex];
  const ownerReplyLayerTop = [430, 230, 212, 164, 119][phaseIndex];
  const employeeReplyLayerTop = [548, 348, 330, 282, 237][phaseIndex];
  const ownerAckLayerTop = [648, 448, 430, 382, 337][phaseIndex];
  const hasOwnerReply = phaseIndex >= 1;
  const hasEmployeeReply = phaseIndex >= 2;
  const hasOwnerAck = phaseIndex >= 3;
  const hasScheduled = phaseIndex >= 4;

  return (
    <div
      className="bg-[#414141] h-[692px] overflow-clip relative rounded-[28px] w-[320px]"
      data-reach-routing-next-followup-phase={phase}
    >
      <img alt="安排下一次回访原型" className="absolute inset-0 max-w-none object-cover size-full" draggable={false} src={ASSETS.reachRoutingObservationBackground} />
      <motion.img
        alt="员工编辑下一次回访消息"
        animate={{ opacity: phase === "owner-reply" ? 1 : 0 }}
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        initial={false}
        src={ASSETS.reachRoutingObservationComposeBackground}
        transition={transition}
      />

      <motion.div
        animate={{ height: viewportHeight }}
        className="absolute left-0 overflow-hidden top-[182px] w-[320px]"
        initial={false}
        transition={transition}
      >
        <motion.p
          animate={{ opacity: phaseIndex === 0 ? 0.5 : 0, y: phaseIndex === 0 ? 0 : -8 }}
          className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-[126.5px] m-0 text-[10px] text-white top-[38.347px] whitespace-nowrap"
          initial={false}
          transition={transition}
        >
          7月28日 12:58
        </motion.p>
        <motion.img
          alt="到店签到与服务套餐图层"
          animate={{ opacity: phaseIndex === 0 ? 1 : 0, y: phaseIndex === 0 ? 0 : -8 }}
          className="absolute h-[92.667px] left-[13px] top-[57.347px] w-[294px]"
          data-reach-routing-next-followup-layer="check-in"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpCheckIn}
          transition={transition}
        />
        <motion.img
          alt="洗护服务结束与报告送达"
          animate={{ top: reportLayerTop }}
          className="absolute h-[111px] left-[13px] w-[294px]"
          data-reach-routing-next-followup-layer="report-delivered"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpReportDelivered}
          transition={transition}
        />
        <motion.img
          alt="员工回访问句"
          animate={{ top: questionLayerTop }}
          className="absolute h-[98px] left-[13px] w-[294px]"
          data-reach-routing-next-followup-layer="question"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpQuestion}
          transition={transition}
        />
        <motion.img
          alt="宠主反馈与现场照片"
          animate={{ opacity: hasOwnerReply ? 1 : 0, top: ownerReplyLayerTop, y: hasOwnerReply ? 0 : 8 }}
          className="absolute h-[116px] left-[13px] w-[294px]"
          data-reach-routing-next-followup-layer="owner-reply"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpOwnerReply}
          transition={transition}
        />
        <motion.img
          alt="员工下一次回访建议"
          animate={{ opacity: hasEmployeeReply ? 1 : 0, top: employeeReplyLayerTop, y: hasEmployeeReply ? 0 : 8 }}
          className="absolute h-[81px] left-[13px] w-[294px]"
          data-reach-routing-next-followup-layer="employee-reply"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpEmployeeReply}
          transition={transition}
        />
        <motion.img
          alt="宠主确认继续观察"
          animate={{ opacity: hasOwnerAck ? 1 : 0, top: ownerAckLayerTop, y: hasOwnerAck ? 0 : 8 }}
          className="absolute h-[41px] left-[13px] w-[294px]"
          data-reach-routing-next-followup-layer="owner-ack"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingNextFollowUpOwnerAck}
          transition={transition}
        />
        <motion.div
          animate={{ opacity: hasScheduled ? 1 : 0, y: hasScheduled ? 0 : 8 }}
          className="absolute h-[32px] left-[13px] text-center top-[391px] w-[294px]"
          initial={false}
          style={{ visibility: hasScheduled ? "visible" : "hidden" }}
          transition={transition}
        >
          <p className="font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] m-0 opacity-50 text-[10px] text-white">7月29日 13:26</p>
          <p className="font-['SF_Pro_Text:Light',sans-serif] font-light leading-[13px] m-0 mt-[7px] opacity-50 text-[11px] text-white whitespace-nowrap">判断事件持续，3日后有回访任务　<span className="text-[#8cf97e] underline">手动完结</span></p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ReachRoutingWorsenedOwnerPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<ReachRoutingWorsenedPhase>("draft");
  const phaseIndex = REACH_ROUTING_WORSENED_PHASES.indexOf(phase);

  useEffect(() => {
    setPhase("draft");
  }, [active, resetToken]);

  useEffect(() => {
    if (!active || (phase !== "sent" && phase !== "selected")) return;
    if (shouldReduceMotion) {
      setPhase(phase === "sent" ? "slots" : "appointment");
      return;
    }

    const timer = window.setTimeout(() => {
      setPhase(phase === "sent" ? "slots" : "appointment");
    }, 600);
    return () => window.clearTimeout(timer);
  }, [active, phase, shouldReduceMotion]);

  const transition = {
    duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;
  const contentOffset = [0, -7, -425, -476, -620][phaseIndex];
  const hasOwnerReply = phaseIndex >= 1;
  const hasAdvice = phaseIndex >= 2;
  const hasSelectedSlot = phaseIndex >= 3;
  const hasAppointment = phaseIndex >= 4;

  return (
    <div
      className="bg-[#4c392d] h-[692px] overflow-hidden relative rounded-[28px] w-[320px]"
      data-reach-routing-worsened-phase={phase}
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        src={ASSETS.reachRoutingWorsenedBackgroundThread}
        style={{ opacity: phase === "draft" ? 0 : 1 }}
      />
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        src={ASSETS.reachRoutingWorsenedBackgroundDraft}
        style={{ opacity: phase === "draft" ? 1 : 0 }}
      />

      <motion.div
        animate={{ height: phase === "draft" ? 410 : 532 }}
        className="absolute left-0 overflow-hidden rounded-t-[18px] top-[82px] w-[320px]"
        initial={false}
        transition={transition}
      >
        <motion.div
          animate={{ y: contentOffset }}
          className="absolute h-[1200px] left-[13px] top-0 w-[294px]"
          initial={false}
          transition={transition}
        >
          <img alt="到店签到与服务套餐" className="absolute h-[148px] left-0 top-[20px] w-[294px]" draggable={false} src={ASSETS.reachRoutingWorsenedOwnerBase} />
          <p className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-0 m-0 opacity-50 text-[10px] text-center text-white top-[185px] w-[294px]">7月28日 14:03</p>
          <img alt="洗护报告已送达" className="absolute h-[91px] left-0 top-[201px] w-[294px]" draggable={false} src={ASSETS.reachRoutingWorsenedReport} />
          <p className="absolute font-['SF_Pro_Text:Light',sans-serif] font-light leading-[12px] left-0 m-0 opacity-50 text-[10px] text-center text-white top-[309px] w-[294px]">7月29日 13:24</p>
          <img alt="员工回访问题" className="absolute h-[85px] left-0 top-[325px] w-[294px]" draggable={false} src={ASSETS.reachRoutingWorsenedFollowUp} />
          <motion.img
            alt="宠主反馈症状加重"
            animate={{ opacity: hasOwnerReply ? 1 : 0, y: hasOwnerReply ? 0 : 8 }}
            className="absolute h-[125px] left-0 top-[414px] w-[294px]"
            draggable={false}
            initial={false}
            src={ASSETS.reachRoutingWorsenedOwnerReply}
            transition={transition}
          />
          <motion.img
            alt="智喵诊疗建议"
            animate={{ opacity: hasAdvice ? 1 : 0, y: hasAdvice ? 0 : 8 }}
            className="absolute h-[99px] left-0 top-[543px] w-[294px]"
            draggable={false}
            initial={false}
            src={ASSETS.reachRoutingWorsenedAiAdvice}
            transition={transition}
          />
          <motion.div
            animate={{ opacity: hasAdvice ? 1 : 0, y: hasAdvice ? 0 : 8 }}
            className="absolute h-[223px] left-0 top-[642px] w-[294px]"
            initial={false}
            transition={transition}
          >
            <motion.img
              alt="可选诊疗时间"
              animate={{ opacity: hasSelectedSlot ? 0 : 1 }}
              className="absolute inset-0 size-full"
              draggable={false}
              initial={false}
              src={ASSETS.reachRoutingWorsenedSlotsInitial}
              transition={transition}
            />
            <motion.img
              alt="已选择诊疗时间"
              animate={{ opacity: hasSelectedSlot ? 1 : 0 }}
              className="absolute inset-0 size-full"
              draggable={false}
              initial={false}
              src={ASSETS.reachRoutingWorsenedSlotsActive}
              transition={transition}
            />
            <button
              aria-label="选择周二 18:30–21:00 诊疗时间"
              className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[27px] left-[46.05px] p-0 rounded-[8px] top-[67px] w-[102px]"
              data-reach-routing-worsened-slot-hotspot
              disabled={!hasAdvice || hasSelectedSlot}
              onClick={() => setPhase("selected")}
              style={{ pointerEvents: hasAdvice && !hasSelectedSlot ? "auto" : "none" }}
              type="button"
            >
              {hasAdvice && !hasSelectedSlot ? (
                <ActionHotspotPulse
                  color="#fff"
                  maxOpacity={0.5}
                  minOpacity={0.125}
                  radius={8}
                  reducedOpacity={0.5}
                  shouldReduceMotion={shouldReduceMotion}
                  stroke={2}
                />
              ) : null}
            </button>
          </motion.div>
          <motion.div
            animate={{ opacity: hasAdvice ? 1 : 0, y: hasAdvice ? 0 : 8 }}
            className="absolute h-[92px] left-0 top-[865px] w-[294px]"
            initial={false}
            transition={transition}
          >
            <motion.img alt="默认诊疗医生" animate={{ opacity: hasSelectedSlot ? 0 : 1 }} className="absolute inset-0 size-full" draggable={false} initial={false} src={ASSETS.reachRoutingWorsenedDoctorInitial} transition={transition} />
            <motion.img alt="已选诊疗医生" animate={{ opacity: hasSelectedSlot ? 1 : 0 }} className="absolute inset-0 size-full" draggable={false} initial={false} src={ASSETS.reachRoutingWorsenedDoctorActive} transition={transition} />
          </motion.div>
          <motion.img
            alt="诊疗时段确认"
            animate={{ opacity: hasSelectedSlot ? 1 : 0, y: hasSelectedSlot ? 0 : 8 }}
            className="absolute h-[47px] left-0 top-[961px] w-[294px]"
            draggable={false}
            initial={false}
            src={ASSETS.reachRoutingWorsenedSlotConfirmed}
            transition={transition}
          />
          <motion.img
            alt="诊疗预约已创建"
            animate={{ opacity: hasAppointment ? 1 : 0, y: hasAppointment ? 0 : 8 }}
            className="absolute h-[140px] left-0 top-[1012px] w-[294px]"
            draggable={false}
            initial={false}
            src={ASSETS.reachRoutingWorsenedAppointment}
            transition={transition}
          />
        </motion.div>
      </motion.div>

      <button
        aria-label="发送症状加重反馈"
        className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[30.6px] left-[270.449px] p-0 rounded-[28.8px] top-[629.449px] w-[30.6px]"
        data-reach-routing-worsened-send-hotspot
        onClick={() => setPhase("sent")}
        style={{ display: phase === "draft" ? "block" : "none" }}
        type="button"
      >
        <ActionHotspotPulse
          color="#fff"
          maxOpacity={0.5}
          minOpacity={0.125}
          radius={28.8}
          reducedOpacity={0.5}
          shouldReduceMotion={shouldReduceMotion}
          stroke={2}
        />
      </button>
    </div>
  );
}

function ReachRoutingDiagnosisTaskPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [inserted, setInserted] = useState(false);

  useEffect(() => {
    setInserted(false);
    if (!active) return;
    if (shouldReduceMotion) {
      setInserted(true);
      return;
    }

    const timer = window.setTimeout(
      () => setInserted(true),
      REACH_ROUTING_DIAGNOSIS_INSERT_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [active, resetToken, shouldReduceMotion]);

  const transition = {
    duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;
  const scheduleRows = [
    ASSETS.reachRoutingScheduleDutyMorning,
    ASSETS.reachRoutingScheduleBoardingSmall,
    ASSETS.reachRoutingScheduleDutyAfternoon,
    ASSETS.reachRoutingScheduleBoardingMedium,
  ] as const;

  return (
    <div
      className="bg-[#1d1d1d] h-[692px] overflow-hidden relative rounded-[28px] w-[320px]"
      data-reach-routing-diagnosis-state={inserted ? "inserted" : "initial"}
    >
      <img alt="新增诊疗任务排班页面" className="absolute inset-0 max-w-none object-cover size-full" draggable={false} src={ASSETS.reachRoutingDiagnosisSchedule} />

      <motion.span
        className="absolute bg-[#8cf97e] flex font-['SF_Pro_Text:Bold',sans-serif] h-[14px] items-center justify-center left-[254px] rounded-[11.947px] text-[#1f1f1f] text-[7.68px] top-[87px] w-[14px]"
        data-reach-routing-diagnosis-total-count
        initial={false}
        transition={transition}
      >{inserted ? 3 : 2}</motion.span>
      <motion.img
        alt=""
        aria-hidden="true"
        animate={{ opacity: inserted ? 1 : 0 }}
        className="absolute h-[16px] left-[119.5px] top-[171.5px] w-[16px]"
        data-reach-routing-diagnosis-day-count
        draggable={false}
        initial={false}
        src={ASSETS.reachRoutingDiagnosisDayCount}
        transition={transition}
      />

      <motion.div
        animate={{ opacity: inserted ? 1 : 0 }}
        className="absolute h-[58px] left-[10px] top-[278px] w-[300px]"
        data-reach-routing-diagnosis-new-row
        initial={false}
        transition={transition}
      >
        <img alt="新增 Luna 诊疗任务" className="absolute inset-0 size-full" draggable={false} src={ASSETS.reachRoutingScheduleDiagnosisNew} />
        <img
          alt=""
          aria-hidden="true"
          className="absolute h-[13px] left-[-3px] top-[-3px] w-[22.6px]"
          data-reach-routing-diagnosis-new-indicator
          draggable={false}
          src={ASSETS.reachRoutingDiagnosisNewIndicator}
        />
      </motion.div>

      <motion.img
        alt=""
        animate={{ opacity: inserted ? 1 : 0 }}
        aria-hidden="true"
        className="absolute h-px left-[18px] top-[352px] w-[284px]"
        data-reach-routing-diagnosis-divider
        draggable={false}
        initial={false}
        src={ASSETS.reachRoutingDiagnosisDivider}
        transition={transition}
      />

      <motion.div
        animate={{ height: inserted ? 231 : 322, y: inserted ? 91 : 0 }}
        className="absolute h-[322px] left-[10px] overflow-hidden top-[278px] w-[300px]"
        data-reach-routing-diagnosis-existing-list
        initial={false}
        transition={transition}
      >
        {scheduleRows.map((src, index) => (
          <img
            alt="排班任务"
            className="absolute h-[58px] left-0 w-[300px]"
            data-reach-routing-diagnosis-existing-row={index + 1}
            draggable={false}
            key={src}
            src={src}
            style={{ top: index * 65 }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function ReachRoutingOverdueMerchantPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<ReachRoutingOverdueMerchantPhase>(
    REACH_ROUTING_OVERDUE_MERCHANT_PHASES[0],
  );
  const [completionPhase, setCompletionPhase] =
    useState<ReachRoutingOverdueMerchantCompletionPhase>(
      REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[0],
    );
  const completionSmartAnimateTransition = {
    duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;

  useEffect(() => {
    setPhase(REACH_ROUTING_OVERDUE_MERCHANT_PHASES[0]);
    setCompletionPhase(REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[0]);
  }, [active, resetToken]);

  useEffect(() => {
    if (!active || phase !== REACH_ROUTING_OVERDUE_MERCHANT_PHASES[2]) {
      setCompletionPhase(REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[0]);
      return;
    }

    // Reduced motion removes interpolation, not the "已执行" confirmation step.
    setCompletionPhase(REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[0]);
    const completionTimers = REACH_ROUTING_OVERDUE_MERCHANT_SWITCH_MS.map(
      (delay, index) =>
        window.setTimeout(
          () => {
            if (index === 0) {
              setCompletionPhase(REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[1]);
            } else {
              setCompletionPhase(REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[2]);
            }
          },
          delay,
        ),
    );

    return () => {
      completionTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, phase, resetToken, shouldReduceMotion]);

  const showsOpportunity =
    completionPhase === REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[0];
  const showsExecuted =
    completionPhase === REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[1];
  const showsNextTask =
    completionPhase === REACH_ROUTING_OVERDUE_MERCHANT_COMPLETION_PHASES[2];

  return (
    <div
      className="absolute inset-0 overflow-hidden rounded-[28px]"
      data-reach-routing-overdue-merchant-phase={phase}
      data-reach-routing-overdue-merchant-completion-phase={completionPhase}
    >
      <img
        alt="商户端客户经营与用户唤醒"
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        src={ASSETS.reachRoutingOverdueMerchantInitial}
        style={{
          display:
            phase === REACH_ROUTING_OVERDUE_MERCHANT_PHASES[0]
              ? "block"
              : "none",
        }}
      />
      <img
        alt="回访任务执行结果预览"
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        src={ASSETS.reachRoutingOverdueMerchantPreview}
        style={{
          display:
            phase === REACH_ROUTING_OVERDUE_MERCHANT_PHASES[1]
              ? "block"
              : "none",
        }}
      />
      <img
        alt="回访排班执行后的客户经营页面"
        className="absolute inset-0 max-w-none object-cover size-full"
        draggable={false}
        src={ASSETS.reachRoutingOverdueMerchantUpdated}
        style={{
          display:
            phase === REACH_ROUTING_OVERDUE_MERCHANT_PHASES[2]
              ? "block"
              : "none",
        }}
      />

      <button
        aria-label="查看智能回访执行结果"
        className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[32px] left-[104.5px] p-0 rounded-[8px] top-[185px] w-[81.5px]"
        data-reach-routing-overdue-merchant-dashboard-hotspot
        onClick={() => setPhase(REACH_ROUTING_OVERDUE_MERCHANT_PHASES[1])}
        style={{
          display:
            phase === REACH_ROUTING_OVERDUE_MERCHANT_PHASES[0]
              ? "block"
              : "none",
        }}
        type="button"
      >
        <ActionHotspotPulse
          color="#8cf97e"
          radius={8}
          shouldReduceMotion={shouldReduceMotion}
          stroke={2.5}
        />
      </button>

      <button
        aria-label="确认一键回访"
        className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[47px] left-[165.2px] p-0 rounded-[23.5px] top-[616.2px] w-[141px]"
        data-reach-routing-overdue-merchant-preview-hotspot
        onClick={() => setPhase(REACH_ROUTING_OVERDUE_MERCHANT_PHASES[2])}
        style={{
          display:
            phase === REACH_ROUTING_OVERDUE_MERCHANT_PHASES[1]
              ? "block"
              : "none",
        }}
        type="button"
      >
        <ActionHotspotPulse
          color="#8cf97e"
          radius={23.5}
          shouldReduceMotion={shouldReduceMotion}
          stroke={2}
        />
      </button>

      <div
        aria-hidden={phase !== REACH_ROUTING_OVERDUE_MERCHANT_PHASES[2]}
        className="absolute h-[126px] right-[122px] overflow-hidden pb-[8.5px] pl-[7px] pr-[10px] pt-[10px] top-[129px] w-[190px]"
        data-reach-routing-overdue-merchant-completion-card
        style={{
          display:
            phase === REACH_ROUTING_OVERDUE_MERCHANT_PHASES[2]
              ? "block"
              : "none",
        }}
      >
        <div className="h-[82px] w-[173px]">
          <motion.div
            animate={{ x: showsNextTask ? -183 : 0 }}
            className="flex gap-[10px] h-[82px] w-[356px]"
            data-overdue-completion-card-track
            initial={false}
            transition={completionSmartAnimateTransition}
          >
            <div className="bg-[rgba(255,255,255,0.6)] flex flex-col h-[82px] justify-between p-[7px] rounded-[7px] shadow-[0_0_12px_rgba(75,103,249,0.1)] shrink-0 w-[173px]">
              <motion.p
                animate={{ opacity: showsOpportunity ? 1 : 0.5 }}
                className="font-['PingFang_SC:Medium',sans-serif] leading-[17.04px] m-0 text-[10px] text-[rgba(0,22,78,0.6)]"
                data-overdue-completion-description
                initial={false}
                transition={completionSmartAnimateTransition}
              >
                检测到 <b className="font-['PingFang_SC:Semibold',sans-serif] text-[#4b67f9]">6位</b> 用户有
                <b className="font-['PingFang_SC:Semibold',sans-serif] text-[#4b67f9]">洗护服务</b>
                复购潜力，是否派发回访任务？
              </motion.p>
              <div className="h-[27px] relative w-[159px]">
                <motion.span
                  animate={{
                    backgroundColor: showsOpportunity ? "rgba(75,103,249,0)" : "rgba(75,103,249,1)",
                    borderColor: showsOpportunity ? "#dde2ff" : "rgba(221,226,255,0)",
                    width: showsOpportunity ? 76 : 159,
                  }}
                  className="absolute border-[0.852px] border-solid flex h-[27px] items-center justify-center left-0 overflow-hidden rounded-[5px] top-0"
                  data-overdue-completion-action
                  initial={false}
                  transition={completionSmartAnimateTransition}
                >
                  <motion.span
                    animate={{ opacity: showsOpportunity ? 1 : 0 }}
                    className="absolute text-[#4b67f9] text-[10px] whitespace-nowrap"
                    data-overdue-completion-manual-label
                    initial={false}
                    transition={completionSmartAnimateTransition}
                  >
                    手动派发
                  </motion.span>
                  <motion.span
                    animate={{ opacity: showsExecuted || showsNextTask ? 1 : 0 }}
                    className="absolute flex gap-[7px] items-center text-[10.224px] text-white whitespace-nowrap"
                    data-overdue-completion-executed-label
                    initial={false}
                    transition={completionSmartAnimateTransition}
                  >
                    <img
                      alt=""
                      className="size-[10.224px]"
                      draggable={false}
                      src={ASSETS.reachRoutingOverdueMerchantExecutedCheck}
                    />
                    已执行
                  </motion.span>
                </motion.span>
                <motion.span
                  animate={{ opacity: showsOpportunity ? 1 : 0 }}
                  className="absolute bg-[#4b67f9] flex h-[27px] items-center justify-center right-0 rounded-[5px] text-[10px] text-white top-0 w-[76px]"
                  data-overdue-completion-smart-action
                  initial={false}
                  transition={completionSmartAnimateTransition}
                >
                  智能重排
                </motion.span>
              </div>
            </div>

            <div className="bg-[rgba(255,255,255,0.6)] flex flex-col h-[82px] justify-between p-[7px] rounded-[7px] shadow-[0_0_12px_rgba(75,103,249,0.1)] shrink-0 w-[173px]">
              <p className="font-['PingFang_SC:Medium',sans-serif] leading-[17.04px] m-0 text-[10px] text-[rgba(0,22,78,0.6)]">
                检测到 <b className="font-['PingFang_SC:Semibold',sans-serif] text-[#4b67f9]">4笔</b> 客诉订单临近截止日期，是否帮您一键催办？
              </p>
              <div className="flex gap-[7px] h-[27px]">
                <span className="border-[0.852px] border-[#dde2ff] border-solid flex h-[27px] items-center justify-center rounded-[5px] text-[#4b67f9] text-[10px] w-[76px]">手动处理</span>
                <span className="bg-[#4b67f9] flex h-[27px] items-center justify-center rounded-[5px] text-[10px] text-white w-[76px]">智能催办</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute flex gap-[3.5px] h-[14px] items-center left-[7px] top-[103.5px] w-[173px]">
          <motion.span
            animate={{ height: showsNextTask ? 7 : 14, width: showsNextTask ? 7 : 14 }}
            className="relative shrink-0"
            initial={false}
            transition={completionSmartAnimateTransition}
          >
            <motion.img
              alt=""
              animate={{ opacity: showsOpportunity ? 1 : 0 }}
              className="absolute inset-0 size-full"
              draggable={false}
              initial={false}
              src={ASSETS.reachRoutingOverdueMerchantProgressStep1Active}
              transition={completionSmartAnimateTransition}
            />
            <motion.img
              alt=""
              animate={{ opacity: showsExecuted ? 1 : 0 }}
              className="absolute inset-0 size-full"
              draggable={false}
              initial={false}
              src={ASSETS.reachRoutingOverdueMerchantProgressStep1Executed}
              transition={completionSmartAnimateTransition}
            />
            <motion.img
              alt=""
              animate={{ opacity: showsNextTask ? 1 : 0 }}
              className="absolute inset-0 size-full"
              draggable={false}
              initial={false}
              src={ASSETS.reachRoutingOverdueMerchantProgressStep1Complete}
              transition={completionSmartAnimateTransition}
            />
          </motion.span>
          <img alt="" className="h-[1.704px] shrink-0 w-[39px]" draggable={false} src={ASSETS.reachRoutingOverdueMerchantProgressLine} />
          <motion.span
            animate={{ height: showsNextTask ? 14 : 7, width: showsNextTask ? 14 : 7 }}
            className="relative shrink-0"
            initial={false}
            transition={completionSmartAnimateTransition}
          >
            <motion.img
              alt=""
              animate={{ opacity: showsNextTask ? 0 : 1 }}
              className="absolute inset-0 size-full"
              draggable={false}
              initial={false}
              src={ASSETS.reachRoutingOverdueMerchantProgressStepInactive}
              transition={completionSmartAnimateTransition}
            />
            <motion.img
              alt=""
              animate={{ opacity: showsNextTask ? 1 : 0 }}
              className="absolute inset-0 size-full"
              draggable={false}
              initial={false}
              src={ASSETS.reachRoutingOverdueMerchantProgressStep2Active}
              transition={completionSmartAnimateTransition}
            />
          </motion.span>
          {[0, 1].map((item) => (
            <React.Fragment key={`overdue-progress-${item}`}>
              <img alt="" className="h-[1.704px] shrink-0 w-[39px]" draggable={false} src={ASSETS.reachRoutingOverdueMerchantProgressLine} />
              <img alt="" className="shrink-0 size-[7px]" draggable={false} src={ASSETS.reachRoutingOverdueMerchantProgressStepInactive} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReachRoutingOverdueOwnerPrototype({
  active,
  resetToken,
  shouldReduceMotion,
}: {
  active: boolean;
  resetToken: number;
  shouldReduceMotion: boolean;
}) {
  const [phase, setPhase] = useState<ReachRoutingOverdueOwnerPhase>(
    REACH_ROUTING_OVERDUE_OWNER_PHASES[0],
  );
  const ownerSmartAnimateTransition = {
    duration:
      shouldReduceMotion || phase === REACH_ROUTING_OVERDUE_OWNER_PHASES[0]
        ? 0
        : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;

  useEffect(() => {
    if (!active) {
      setPhase(REACH_ROUTING_OVERDUE_OWNER_PHASES[0]);
      return;
    }
    setPhase(REACH_ROUTING_OVERDUE_OWNER_PHASES[0]);
    const phaseTimers = REACH_ROUTING_OVERDUE_OWNER_SWITCH_MS.map(
      (delay, index) =>
        window.setTimeout(
          () => {
            if (index === 0) {
              setPhase(REACH_ROUTING_OVERDUE_OWNER_PHASES[1]);
            } else {
              setPhase(REACH_ROUTING_OVERDUE_OWNER_PHASES[2]);
            }
          },
          delay,
        ),
    );
    return () => {
      phaseTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [active, resetToken, shouldReduceMotion]);

  const showsUnreadOne = phase === REACH_ROUTING_OVERDUE_OWNER_PHASES[1];
  const showsUnreadTwo = phase === REACH_ROUTING_OVERDUE_OWNER_PHASES[2];
  const showsConversation = phase === REACH_ROUTING_OVERDUE_OWNER_PHASES[3];
  const showsInitial = phase === REACH_ROUTING_OVERDUE_OWNER_PHASES[0];
  const showsCompleteMessages = showsUnreadTwo || showsConversation;

  return (
    <div
      className="absolute inset-0 overflow-clip rounded-[28px]"
      data-reach-routing-overdue-owner-phase={phase}
    >
      <motion.div
        animate={{ opacity: showsConversation ? 0 : 1 }}
        className="absolute inset-0 overflow-hidden rounded-[28px]"
        data-overdue-owner-sidebar
        initial={false}
        transition={ownerSmartAnimateTransition}
      >
        <img
          alt="宠主端复购邀约入口"
          className="absolute inset-0 max-w-none object-cover size-full"
          draggable={false}
          src={ASSETS.reachRoutingOverdueOwnerSidebarInitial}
        />
        <motion.img
          alt="收到一条复购邀约消息"
          animate={{ opacity: showsInitial ? 0 : 1 }}
          className="absolute inset-0 max-w-none object-cover size-full"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingOverdueOwnerSidebarUnread1}
          transition={ownerSmartAnimateTransition}
        />
        <motion.img
          alt="收到完整复购邀约消息"
          animate={{ opacity: showsCompleteMessages ? 1 : 0 }}
          className="absolute inset-0 max-w-none object-cover size-full"
          draggable={false}
          initial={false}
          src={ASSETS.reachRoutingOverdueOwnerSidebarUnread2}
          transition={ownerSmartAnimateTransition}
        />
      </motion.div>

      <motion.div
        animate={{ x: showsConversation ? 0 : 253 }}
        className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
        data-overdue-owner-chat-panel
        initial={false}
        transition={ownerSmartAnimateTransition}
      >
        <motion.div
          animate={{ opacity: showsConversation ? 1 : 0.5 }}
          className="absolute inset-0 overflow-hidden rounded-[28px]"
          data-overdue-owner-chat-content
          initial={false}
          transition={ownerSmartAnimateTransition}
        >
          <img
            alt="宠主端复购邀约聊天背景"
            className="absolute inset-0 max-w-none object-cover size-full"
            draggable={false}
            src={ASSETS.reachRoutingOverdueOwnerChatBackground}
          />
          <div className="absolute h-[532px] left-0 overflow-hidden top-[82px] w-[320px]" data-overdue-owner-message-viewport>
            <motion.div
              animate={{ y: showsCompleteMessages ? -468 : showsUnreadOne ? -154 : 0 }}
              className="absolute h-[1158px] left-[13px] top-[-158px] w-[294px]"
              data-overdue-owner-message-track
              initial={false}
              transition={ownerSmartAnimateTransition}
            >
              <img alt="历史健康报告消息" className="absolute h-[148px] left-0 object-cover top-0 w-[294px]" draggable={false} src={ASSETS.reachRoutingOverdueOwnerChatHistory1} />
              <div className="absolute flex flex-col gap-[4px] h-[107px] items-center left-0 top-[165px] w-[294px]">
                <p className="font-['SF_Pro_Text:Light',sans-serif] h-[12px] leading-[12px] m-0 opacity-50 shrink-0 text-[10px] text-white">7月28日 14:03</p>
                <img alt="历史智能建议" className="h-[91px] object-cover shrink-0 w-[294px]" draggable={false} src={ASSETS.reachRoutingOverdueOwnerChatHistory2} />
              </div>
              <div className="absolute flex flex-col gap-[4px] h-[353px] items-center left-0 top-[289px] w-[294px]">
                <p className="font-['SF_Pro_Text:Light',sans-serif] h-[12px] leading-[12px] m-0 opacity-50 shrink-0 text-[10px] text-white">7月29日 13:24</p>
                <img alt="历史回访消息" className="h-[85px] object-cover shrink-0 w-[294px]" draggable={false} src={ASSETS.reachRoutingOverdueOwnerChatHistory3} />
                <img alt="宠主健康状态回复" className="h-[125px] object-cover shrink-0 w-[294px]" draggable={false} src={ASSETS.reachRoutingOverdueOwnerChatOverlay1} />
                <img alt="员工继续观察回复" className="h-[67px] object-cover shrink-0 w-[294px]" draggable={false} src={ASSETS.reachRoutingOverdueOwnerChatOverlay2} />
                <img alt="宠主确认回复" className="h-[48px] object-cover shrink-0 w-[294px]" draggable={false} src={ASSETS.reachRoutingOverdueOwnerChatOverlay3} />
              </div>
              <img alt="逾期未反馈系统消息" className="absolute h-[31px] left-0 object-cover top-[659px] w-[294px]" draggable={false} src={ASSETS.reachRoutingOverdueOwnerChatOverlay4} />
              <div className="absolute flex flex-col gap-0 left-0 top-[707px] w-[294px]" data-overdue-owner-new-messages>
                <motion.img
                  alt="复购邀约新消息"
                  animate={{ opacity: showsInitial ? 0 : 1 }}
                  className="h-[137px] object-cover shrink-0 w-[294px]"
                  draggable={false}
                  initial={false}
                  src={ASSETS.reachRoutingOverdueOwnerChatOverlay5}
                  transition={ownerSmartAnimateTransition}
                />
                <motion.img
                  alt="完整复购邀约建议"
                  animate={{ opacity: showsCompleteMessages ? 1 : 0 }}
                  className="h-[314px] object-cover shrink-0 w-[294px]"
                  draggable={false}
                  initial={false}
                  src={ASSETS.reachRoutingOverdueOwnerChatOverlay6}
                  transition={ownerSmartAnimateTransition}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          animate={{ opacity: showsConversation ? 0 : 1 }}
          className="absolute border-[0.8px] border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[28px]"
          data-overdue-owner-preview-stroke
          initial={false}
          transition={ownerSmartAnimateTransition}
        />
        <button
          aria-label="打开完整复购邀约"
          className="absolute appearance-none bg-transparent border-0 cursor-pointer h-full left-0 p-0 rounded-[28px] top-0 w-[67px]"
          data-reach-routing-overdue-owner-message-hotspot
          onClick={() => setPhase(REACH_ROUTING_OVERDUE_OWNER_PHASES[3])}
          style={{ display: showsUnreadTwo ? "block" : "none" }}
          type="button"
        />
      </motion.div>

      <button
        aria-label="查看闪烁的复购邀约消息"
        className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[46px] left-[5.05078125px] p-0 rounded-[8px] top-[350px] w-[242px]"
        data-overdue-owner-row-hotspot
        onClick={() => setPhase(REACH_ROUTING_OVERDUE_OWNER_PHASES[3])}
        style={{ display: showsUnreadTwo ? "block" : "none" }}
        type="button"
      >
        <ActionHotspotPulse
          color="#fff"
          insetOnly
          maxOpacity={0.5}
          minOpacity={0.18}
          radius={8}
          reducedOpacity={0.5}
          shouldReduceMotion={shouldReduceMotion}
          stroke={4}
        />
      </button>
    </div>
  );
}

function ReachRoutingToggleSwitch({
  checked,
  shouldReduceMotion,
  tone,
}: {
  checked: boolean;
  shouldReduceMotion: boolean;
  tone: ReachRoutingView;
}) {
  const transition = {
    duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;

  return (
    <span
      aria-hidden="true"
      className="block h-[24px] overflow-hidden relative rounded-[16.8px] shrink-0 w-[44.1px]"
      data-reach-routing-switch={checked ? "on" : "off"}
    >
      <span className="absolute bg-[#dadada] inset-0 rounded-[inherit]" />
      <motion.span
        animate={{ opacity: checked ? 1 : 0 }}
        className="absolute inset-0 rounded-[inherit]"
        initial={false}
        style={{ backgroundImage: REACH_ROUTING_SWITCH_ACTIVE_BACKGROUND[tone] }}
        transition={transition}
      />

      <motion.span
        animate={{ x: checked ? 3.6 : -15.6 }}
        className="absolute flex items-center justify-between left-0 top-[4.5px] w-[56.1px]"
        initial={false}
        transition={transition}
      >
        <img
          alt=""
          className="block size-[15px]"
          draggable={false}
          src={checked ? ASSETS.reachRoutingSwitchOnLeft : ASSETS.reachRoutingSwitchOffLeft}
        />
        <img
          alt=""
          className="block size-[15px]"
          draggable={false}
          src={checked ? ASSETS.reachRoutingSwitchOnRight : ASSETS.reachRoutingSwitchOffRight}
        />
      </motion.span>

      <motion.span
        animate={{ x: checked ? 22.65 : 2.55 }}
        className="absolute left-0 rounded-[13.2px] size-[18.9px] top-[2.55px]"
        initial={false}
        style={{
          backgroundImage: "linear-gradient(180deg, #fff 0%, #c4c4c4 100%)",
          boxShadow:
            "0 0.6px 1.2px -0.45px rgba(0,0,0,0.54), 0.45px 4.2px 4.05px 0.75px rgba(0,0,0,0.22)",
          padding: checked ? 0.75 : 1,
        }}
        transition={transition}
      >
        <span className="block bg-[#e2e2e2] rounded-[inherit] size-full" />
      </motion.span>

      <span
        className="absolute inset-0 pointer-events-none rounded-[inherit]"
        style={{
          boxShadow:
            "inset 0.3px 0 1.8px -0.45px rgba(0,0,0,0.22), inset 0 2.25px 1.35px -1.05px rgba(0,0,0,0.2)",
        }}
      />
    </span>
  );
}

function ReachRoutingPrototypePanel({
  onSelectView,
  observationResetToken,
  shouldReduceMotion,
  selectedRoute,
  selectedView,
}: {
  onSelectView: (view: ReachRoutingView) => void;
  observationResetToken: number;
  shouldReduceMotion: boolean;
  selectedRoute: ReachRoutingRoute;
  selectedView: ReachRoutingView;
}) {
  const improvedRoute = selectedRoute === "improved";
  const unchangedRoute = selectedRoute === "unchanged";
  const worsenedRoute = selectedRoute === "worsened";
  const overdueRoute = selectedRoute === "overdue";
  const views = REACH_ROUTING_ROUTE_VIEWS[selectedRoute];
  const ownerIsMain = selectedView === "owner-feedback" && improvedRoute;
  const observationIsMain =
    selectedView === "observation-ended" && improvedRoute;
  const ownerUnchangedIsMain =
    selectedView === "owner-unchanged" && unchangedRoute;
  const nextFollowUpIsMain =
    selectedView === "next-followup" && unchangedRoute;
  const ownerWorsenedIsMain =
    selectedView === "owner-worsened" && worsenedRoute;
  const diagnosisTaskIsMain =
    selectedView === "diagnosis-task" && worsenedRoute;
  const merchantWakeupIsMain =
    selectedView === "merchant-wakeup" && overdueRoute;
  const ownerRepurchaseIsMain =
    selectedView === "owner-repurchase" && overdueRoute;
  const ownerNextView: ReachRoutingView = "next-followup";
  const transition = {
    duration: shouldReduceMotion ? 0 : REACH_ROUTING_TRANSITION_SECONDS,
    ease: REACH_ROUTING_EASING,
  } as const;

  return (
    <div className="bg-[rgba(226,226,226,0.5)] border border-[#d2d2d2] border-solid flex flex-col h-[756px] overflow-hidden relative rounded-[8px] w-[460px]" data-reach-routing-route={selectedRoute}>
      <div className="border-[#d2d2d2] border-b flex h-[40px] shrink-0 w-full">
        {views.map((view, index) => {
          const activeView = selectedView === view;
          return (
            <button
              aria-label={`${REACH_ROUTING_VIEW_COPY[view].title}：${REACH_ROUTING_VIEW_COPY[view].subtitle}`}
              aria-pressed={activeView}
              className={`appearance-none bg-transparent border-0 cursor-pointer flex gap-[8px] items-center px-[16px] relative text-left w-[50%] ${
                index === 0 ? "border-[#d2d2d2] border-r" : ""
              } ${activeView ? "" : "opacity-50"}`}
              data-reach-routing-tab={view}
              key={`reach-routing-tab-${view}`}
              onClick={() => onSelectView(view)}
              type="button"
            >
              <ActorIcons
                actors={
                  REACH_ROUTING_VIEW_COPY[view].side === "owner"
                    ? ["owner"]
                    : REACH_ROUTING_VIEW_COPY[view].side === "merchant"
                      ? ["merchant"]
                      : ["employee"]
                }
              />
              <span className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[11px] whitespace-nowrap">
                {REACH_ROUTING_VIEW_COPY[view].title}
              </span>
              <span className="ml-auto">
                <ReachRoutingToggleSwitch
                  checked={activeView}
                  shouldReduceMotion={shouldReduceMotion}
                  tone={view}
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 min-h-0 overflow-hidden relative w-full">
        <div
          aria-hidden="true"
          className="absolute h-[692px] left-[70px] pointer-events-none top-[12px] w-[320px]"
          data-reach-routing-phone
        />

        <motion.div
          animate={{
            opacity: improvedRoute ? (ownerIsMain ? 1 : 0.5) : 0,
            scale: ownerIsMain ? 1 : 0.5,
            x: ownerIsMain ? 70 : -114,
            y: ownerIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-owner-prototype
          initial={false}
          style={{
            pointerEvents: improvedRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <img
            alt="宠主反馈已改善"
            className="absolute inset-0 max-w-none object-cover size-full"
            draggable={false}
            src={ASSETS.reachRoutingOwnerReplyImproved}
          />
          <motion.button
            animate={
              shouldReduceMotion
                ? { opacity: 0.65 }
                : { opacity: [0.25, 0.8, 0.25] }
            }
            aria-label="发送反馈并查看本轮观察结果"
            className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[30.6px] left-[270.449px] p-0 rounded-[28.8px] top-[629.45px] w-[30.6px]"
            data-reach-routing-improved-owner-send-hotspot
            onClick={() => onSelectView("observation-ended")}
            style={{
              boxShadow: "0 0 0 2px rgba(255,255,255,0.5), inset 0 0 0 2px rgba(255,255,255,0.5)",
              display: improvedRoute ? "block" : "none",
            }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
            }
            type="button"
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: improvedRoute ? (observationIsMain ? 1 : 0.5) : 0,
            scale: observationIsMain ? 1 : 0.5,
            x: observationIsMain ? 70 : 414,
            y: observationIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-observation-prototype
          initial={false}
          style={{
            pointerEvents: improvedRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <ReachRoutingObservationPrototype
            active={observationIsMain}
            resetToken={observationResetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: unchangedRoute ? (ownerUnchangedIsMain ? 1 : 0.5) : 0,
            scale: ownerUnchangedIsMain ? 1 : 0.5,
            x: ownerUnchangedIsMain ? 70 : -114,
            y: ownerUnchangedIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-owner-unchanged-prototype
          initial={false}
          style={{
            pointerEvents: unchangedRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <img
            alt="宠主反馈无变化"
            className="absolute inset-0 max-w-none object-cover size-full"
            draggable={false}
            src={ASSETS.reachRoutingOwnerReplyUnchanged}
          />
          <motion.button
            animate={
              shouldReduceMotion
                ? { opacity: 0.65 }
                : { opacity: [0.25, 0.8, 0.25] }
            }
            aria-label="发送无变化反馈并安排下一次回访"
            className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[30.6px] left-[270.449px] p-0 rounded-[28.8px] top-[629.45px] w-[30.6px]"
            data-legacy-improved-action={'onClick={() => onSelectView("observation-ended")}' }
            data-reach-routing-owner-send-hotspot
            onClick={() => onSelectView(ownerNextView)}
            style={{ boxShadow: "0 0 0 2px rgba(255,255,255,0.5), inset 0 0 0 2px rgba(255,255,255,0.5)" }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.8, ease: "easeInOut", repeat: Infinity }
            }
            type="button"
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: unchangedRoute ? (nextFollowUpIsMain ? 1 : 0.5) : 0,
            scale: nextFollowUpIsMain ? 1 : 0.5,
            x: nextFollowUpIsMain ? 70 : 414,
            y: nextFollowUpIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-next-followup-prototype
          initial={false}
          style={{
            pointerEvents: unchangedRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <ReachRoutingNextFollowUpPrototype
            active={nextFollowUpIsMain}
            resetToken={observationResetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: worsenedRoute ? (ownerWorsenedIsMain ? 1 : 0.5) : 0,
            scale: ownerWorsenedIsMain ? 1 : 0.5,
            x: ownerWorsenedIsMain ? 70 : -114,
            y: ownerWorsenedIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-owner-worsened-prototype
          initial={false}
          style={{
            pointerEvents: worsenedRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <ReachRoutingWorsenedOwnerPrototype
            active={ownerWorsenedIsMain}
            resetToken={observationResetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: worsenedRoute ? (diagnosisTaskIsMain ? 1 : 0.5) : 0,
            scale: diagnosisTaskIsMain ? 1 : 0.5,
            x: diagnosisTaskIsMain ? 70 : 414,
            y: diagnosisTaskIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-diagnosis-prototype
          initial={false}
          style={{
            pointerEvents: worsenedRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <ReachRoutingDiagnosisTaskPrototype
            active={diagnosisTaskIsMain}
            resetToken={observationResetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: overdueRoute ? (merchantWakeupIsMain ? 1 : 0.5) : 0,
            scale: merchantWakeupIsMain ? 1 : 0.5,
            x: merchantWakeupIsMain ? 70 : -114,
            y: merchantWakeupIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-overdue-merchant-prototype
          initial={false}
          style={{
            pointerEvents: overdueRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <ReachRoutingOverdueMerchantPrototype
            active={merchantWakeupIsMain}
            resetToken={observationResetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        <motion.div
          animate={{
            opacity: overdueRoute ? (ownerRepurchaseIsMain ? 1 : 0.5) : 0,
            scale: ownerRepurchaseIsMain ? 1 : 0.5,
            x: ownerRepurchaseIsMain ? 70 : 414,
            y: ownerRepurchaseIsMain ? 12 : 185,
          }}
          className="absolute h-[692px] left-0 overflow-hidden rounded-[28px] top-0 w-[320px]"
          data-reach-routing-overdue-owner-prototype
          initial={false}
          style={{
            pointerEvents: overdueRoute ? "auto" : "none",
            transformOrigin: "left top",
          }}
          transition={transition}
        >
          <ReachRoutingOverdueOwnerPrototype
            active={ownerRepurchaseIsMain}
            resetToken={observationResetToken}
            shouldReduceMotion={shouldReduceMotion}
          />
        </motion.div>

        {views.map((view) => {
          const isPreview = selectedView !== view;
          const previewLeft =
            view === "merchant-wakeup"
              ? -114
              : view === "owner-repurchase"
                ? 414
                : REACH_ROUTING_VIEW_COPY[view].side === "owner"
                  ? -114
                  : 414;
          return (
            <button
              aria-label={`切换到${REACH_ROUTING_VIEW_COPY[view].title}`}
              className="absolute appearance-none bg-transparent border-0 cursor-pointer h-[346px] p-0 top-[185px] w-1/2 z-[8]"
              data-reach-routing-preview-hotspot={view}
              key={`reach-routing-preview-${view}`}
              onClick={() => onSelectView(view)}
              style={{
                display: isPreview ? "block" : "none",
                left: previewLeft,
                width: 160,
              }}
              type="button"
            />
          );
        })}
      </div>
    </div>
  );
}

function StageFive() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [selectedRoute, setSelectedRoute] =
    useState<ReachRoutingRoute>("improved");
  const [hoveredRoute, setHoveredRoute] =
    useState<ReachRoutingRoute | null>(null);
  const [reachRoutingView, setReachRoutingView] =
    useState<ReachRoutingView>("owner-feedback");
  const [observationResetToken, setObservationResetToken] = useState(0);

  useEffect(() => {
    [
      ASSETS.reachRoutingOwnerReplyImproved,
      ASSETS.reachRoutingOwnerReplyUnchanged,
      ASSETS.reachRoutingEmployeeNextFollowUp1,
      ASSETS.reachRoutingEmployeeNextFollowUp2,
      ASSETS.reachRoutingWorsenedBackgroundDraft,
      ASSETS.reachRoutingWorsenedBackgroundThread,
      ASSETS.reachRoutingWorsenedOwnerBase,
      ASSETS.reachRoutingWorsenedReport,
      ASSETS.reachRoutingWorsenedFollowUp,
      ASSETS.reachRoutingWorsenedOwnerReply,
      ASSETS.reachRoutingWorsenedAiAdvice,
      ASSETS.reachRoutingWorsenedSlotsInitial,
      ASSETS.reachRoutingWorsenedSlotsActive,
      ASSETS.reachRoutingWorsenedDoctorInitial,
      ASSETS.reachRoutingWorsenedDoctorActive,
      ASSETS.reachRoutingWorsenedSlotConfirmed,
      ASSETS.reachRoutingWorsenedAppointment,
      ASSETS.reachRoutingDiagnosisSchedule,
      ASSETS.reachRoutingScheduleDutyMorning,
      ASSETS.reachRoutingScheduleBoardingSmall,
      ASSETS.reachRoutingScheduleDutyAfternoon,
      ASSETS.reachRoutingScheduleBoardingMedium,
      ASSETS.reachRoutingScheduleDiagnosisNew,
      ASSETS.reachRoutingOverdueMerchantInitial,
      ASSETS.reachRoutingOverdueMerchantPreview,
      ASSETS.reachRoutingOverdueMerchantUpdated,
      ASSETS.reachRoutingOverdueMerchantExecutedCheck,
      ASSETS.reachRoutingOverdueMerchantProgressLine,
      ASSETS.reachRoutingOverdueMerchantProgressStep1Active,
      ASSETS.reachRoutingOverdueMerchantProgressStep1Complete,
      ASSETS.reachRoutingOverdueMerchantProgressStep1Executed,
      ASSETS.reachRoutingOverdueMerchantProgressStep2Active,
      ASSETS.reachRoutingOverdueMerchantProgressStepInactive,
      ASSETS.reachRoutingOverdueOwnerSidebarInitial,
      ASSETS.reachRoutingOverdueOwnerSidebarUnread1,
      ASSETS.reachRoutingOverdueOwnerSidebarUnread2,
      ASSETS.reachRoutingOverdueOwnerChatBackground,
      ASSETS.reachRoutingOverdueOwnerChatHistory1,
      ASSETS.reachRoutingOverdueOwnerChatHistory2,
      ASSETS.reachRoutingOverdueOwnerChatHistory3,
      ASSETS.reachRoutingOverdueOwnerChatOverlay1,
      ASSETS.reachRoutingOverdueOwnerChatOverlay2,
      ASSETS.reachRoutingOverdueOwnerChatOverlay3,
      ASSETS.reachRoutingOverdueOwnerChatOverlay4,
      ASSETS.reachRoutingOverdueOwnerChatOverlay5,
      ASSETS.reachRoutingOverdueOwnerChatOverlay6,
    ].forEach((src) => {
      const image = new Image();
      image.src = src;
      void image.decode?.().catch(() => undefined);
    });
  }, []);

  const selectReachRoutingView = (nextView: ReachRoutingView) => {
    setReachRoutingView(nextView);
    if (
      nextView === "observation-ended" ||
      nextView === "next-followup" ||
      nextView === "owner-worsened" ||
      nextView === "diagnosis-task" ||
      nextView === "merchant-wakeup" ||
      nextView === "owner-repurchase"
    ) {
      setObservationResetToken((token) => token + 1);
    }
  };

  const routeInteraction = (route: ReachRoutingRoute) => ({
    active: selectedRoute === route,
    hovered: hoveredRoute === route,
    onBlur: () => setHoveredRoute(null),
    onFocus: () => setHoveredRoute(route),
    onPointerEnter: () => setHoveredRoute(route),
    onPointerLeave: () => setHoveredRoute(null),
    onSelect: () => {
      setSelectedRoute(route);
      setReachRoutingView(REACH_ROUTING_ROUTE_INITIAL_VIEW[route]);
      if (route === "worsened" || route === "overdue") {
        setObservationResetToken((token) => token + 1);
      }
    },
  });

  const patrolActive = selectedRoute !== "worsened" && selectedRoute !== "overdue";
  const patrolHovered =
    hoveredRoute !== null && hoveredRoute !== "worsened" && hoveredRoute !== "overdue";
  const manualTaskActive = selectedRoute === "worsened" || selectedRoute === "overdue";
  const manualTaskHovered = hoveredRoute === "worsened" || hoveredRoute === "overdue";
  const patrolNoteClassName = "!gap-[4px] !pb-[6px] [&>p:first-child]:leading-[14px] [&>p:first-child]:whitespace-nowrap [&>p:last-child]:leading-[16px]";

  return (
    <div className="content-stretch flex gap-[24px] h-[756px] items-start relative w-[864px]">
      <div className="content-stretch flex flex-col h-[756px] items-start relative shrink-0 w-[380px]">
        <WorkflowCard
          active={patrolActive}
          activeHeaderBackground="linear-gradient(90deg, rgba(131,199,130,0.5) 0%, rgba(255,141,178,0.45) 20%, rgba(153,118,85,0) 100%), linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(210,210,210,0.5) 100%), linear-gradient(90deg, rgb(67,100,176) 0%, rgb(67,100,176) 100%)"
          actorIconGap={8}
          actors={["ai", "owner"]}
          bodyClassName="!gap-[8px] !pb-[8px] !pt-[10px]"
          className="h-[150px]"
          hovered={patrolHovered}
          title="回访任务巡查"
        >
          <div className="px-[16px] whitespace-nowrap" data-reach-routing-patrol-summary>
            <CardSummary active={patrolActive}>报告发送后 24 小时，系统推送回访任务，回访泛红与抓挠变化</CardSummary>
          </div>
          <div className="grid grid-cols-2 gap-[8px] px-[8px] w-full" data-reach-routing-patrol-notes>
            <ConfigNote active={patrolActive} className={patrolNoteClassName} title="预配置生效：自动化规则">决定回访时间、未回复后的提醒频率及默认任务分配。</ConfigNote>
            <ConfigNote active={patrolActive} className={patrolNoteClassName} title="预配置生效：平台风险边界">反馈加重或高风险时停止自动化建议，并强制升级人工处理。</ConfigNote>
          </div>
        </WorkflowCard>

        <FlowDown />

        <div className="content-stretch flex flex-col h-[294px] items-start relative shrink-0 w-full">
          <div className="flex gap-[12px] h-[78px] shrink-0 w-full">
            <CompactBranchCard
              actors={["owner"]}
              title="宠主已反馈【已改善】"
              {...routeInteraction("improved")}
            >
              更新状态，结束本轮观察
            </CompactBranchCard>
            <CompactBranchCard
              actors={["owner"]}
              title="宠主已反馈【无变化】"
              {...routeInteraction("unchanged")}
            >
              继续观察或安排下一次提醒
            </CompactBranchCard>
          </div>
          <div className="flex gap-[12px] h-[78px] mt-[12px] shrink-0 w-full">
            <CompactBranchCard
              actors={["owner"]}
              title="宠主已反馈【加重】"
              {...routeInteraction("worsened")}
            >
              停止 AI 建议,创建员工人工任务
            </CompactBranchCard>
            <CompactBranchCard
              actors={["owner"]}
              title="宠主【逾期未反馈】"
              {...routeInteraction("overdue")}
            >
              再次提醒或进入待跟进列表
            </CompactBranchCard>
          </div>
          <div className="grid grid-cols-2 h-[48px] shrink-0 w-full">
            <FlowDown label="创建人工任务" />
            <FlowDown label="再次提醒超时后" />
          </div>
          <WorkflowCard
            activeHeaderBackground="linear-gradient(90deg, rgba(255,196,141,0.5) 0%, rgba(255,141,178,0.35) 24%, rgba(153,118,85,0) 100%), linear-gradient(90deg, rgba(210,210,210,0.5) 0%, rgba(210,210,210,0.5) 100%), linear-gradient(90deg, rgb(67,100,176) 0%, rgb(67,100,176) 100%)"
            actors={["employee"]}
            bodyClassName="!gap-0 !pb-[8px] !pt-[8px]"
            className="h-[78px]"
            title="人工任务执行"
            {...routeInteraction("worsened")}
            active={manualTaskActive}
            hovered={manualTaskHovered}
            onBlur={() => setHoveredRoute(null)}
            onFocus={() => setHoveredRoute(selectedRoute === "overdue" ? "overdue" : "worsened")}
            onPointerEnter={() => setHoveredRoute(selectedRoute === "overdue" ? "overdue" : "worsened")}
            onPointerLeave={() => setHoveredRoute(null)}
          >
            <CardSummary active={manualTaskActive}>
              <span className="block px-[16px]">默认指派服务员工，商户负责监控与改派</span>
            </CardSummary>
          </WorkflowCard>
        </div>
      </div>

      <ReachRoutingPrototypePanel
        observationResetToken={observationResetToken}
        onSelectView={selectReachRoutingView}
        selectedRoute={selectedRoute}
        selectedView={reachRoutingView}
        shouldReduceMotion={shouldReduceMotion}
      />
    </div>
  );
}

function StageSix() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px relative w-full">
      <div className="content-stretch flex h-[168px] items-start relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[12px] h-full items-start relative shrink-0 w-[308px]">
          <WorkflowCard actors={["owner", "employee"]} title="宠主反馈＋员工处理">
            <div className="px-[16px]"><CardSummary>改善、无变化、加重及人工沟通结果</CardSummary></div>
          </WorkflowCard>
          <WorkflowCard actors={["ai"]} title="经营结果">
            <div className="px-[16px]"><CardSummary>复约、到店、交易或未转化</CardSummary></div>
          </WorkflowCard>
        </div>
        <div className="flex h-full items-start justify-center pt-[14px] shrink-0 w-[48px]">
          <span className="flex-none rotate-90">
            <img alt="" aria-hidden="true" className="block size-[48px]" draggable={false} src={ASSETS.returnArrow} />
          </span>
        </div>
        <div className="border border-[#d2d2d2] border-solid content-stretch flex flex-[1_0_0] flex-col h-full items-start min-w-px overflow-clip rounded-[8px]">
          <div className="bg-[#e2e2e2] content-stretch flex gap-[8px] h-[40px] items-center px-[16px] py-[6px] relative shrink-0 w-full">
            <ActorIcons actors={["ai"]} />
            <p className="font-['OPPOSans:Medium',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px]">结构化回写：更新当前状态与后续计划</p>
          </div>
          <p className="font-['OPPOSans:Light',sans-serif] leading-[20px] px-[16px] py-[10px] text-[#1a1c1c] text-[11px] w-full">
            状态｜未解决事项｜处理结果｜复约状态｜下一步｜来源时间
          </p>
          <div className="border-[#d2d2d2] border-t grid grid-cols-2 flex-[1_0_0] w-full">
            <div className="border-[#d2d2d2] border-r px-[16px] py-[8px]">
              <p className="font-['OPPOSans:Medium',sans-serif] leading-[18px] text-[#474747] text-[11px]">反馈／处理结果</p>
              <p className="font-['OPPOSans:Light',sans-serif] leading-[18px] text-[#1a1c1c] text-[10px]">写入 Luna 历史上下文 → 返回 <b className="bg-[#6c6c6c] font-['DINOT:Bold',sans-serif] px-[3px] text-[8px] text-white">B2</b> 重新理解</p>
            </div>
            <div className="px-[16px] py-[8px]">
              <p className="font-['OPPOSans:Medium',sans-serif] leading-[18px] text-[#474747] text-[11px]">再次到店服务</p>
              <p className="font-['OPPOSans:Light',sans-serif] leading-[18px] text-[#1a1c1c] text-[10px]">员工再次扫描护照码 → 返回 <b className="bg-[#6c6c6c] font-['DINOT:Bold',sans-serif] px-[3px] text-[8px] text-white">B1</b> 创建新服务事件</p>
            </div>
          </div>
        </div>
      </div>
      <PassportPanel className="flex-[1_0_0] w-full" showPassport={false} />
    </div>
  );
}

function PetMindStagePanel({
  onAdvanceToActionOrchestration,
  onAdvanceToAiRecognition,
  onAdvanceToReviewSend,
  recordingPlaybackRef,
  stage,
}: {
  onAdvanceToActionOrchestration: () => void;
  onAdvanceToAiRecognition: () => void;
  onAdvanceToReviewSend: () => void;
  recordingPlaybackRef: RecordingPlaybackRef;
  stage: StageIndex;
}) {
  const content =
    stage <= 1 ? (
      <StageOneTwoBridge
        onAdvanceToAiRecognition={onAdvanceToAiRecognition}
        onAdvanceToReviewSend={onAdvanceToReviewSend}
        recordingPlaybackRef={recordingPlaybackRef}
        stage={stage}
      />
    ) : (
      [
        <StageThree onAdvanceToActionOrchestration={onAdvanceToActionOrchestration} />,
        <StageFour />,
        <StageFive />,
        <StageSix />,
      ][stage - 2]
    );
  const item = STAGES[stage];

  return (
    <div
      aria-labelledby={`petmind-assistant-stage-tab-${item.number}`}
      className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] items-start min-h-px py-[24px] relative rounded-[8px] w-full"
      id={`petmind-assistant-stage-panel-${item.number}`}
      role="tabpanel"
    >
      <div className="content-stretch flex gap-[8px] h-[20px] items-center relative shrink-0 w-full">
        <img alt="" aria-hidden="true" className="block shrink-0 size-[14px]" draggable={false} src={ASSETS.stageIcons[stage]} />
        <p className="[word-break:break-word] font-['OPPOSans:Bold',sans-serif] leading-[20px] opacity-80 text-[#474747] text-[12px] text-center whitespace-nowrap">
          {item.title}
        </p>
        <p className="[word-break:break-word] font-['OPPOSans:Light',sans-serif] leading-[20px] opacity-60 text-[#1a1c1c] text-[11px] whitespace-nowrap">
          {item.description}
        </p>
      </div>
      {content}
    </div>
  );
}

function PetMindAssistantWorkflow() {
  const [stage, setStage] = useState<StageIndex>(0);
  const recordingPlaybackRef = useRef<RecordingPlaybackSnapshot>({
    capturedAt: 0,
    currentTime: 0,
  });

  const selectStage = (nextStage: StageIndex) => {
    setStage(nextStage);
  };

  const advanceToAiRecognition = () => {
    setStage(1);
  };

  const advanceToReviewSend = () => {
    setStage(2);
  };

  const advanceToActionOrchestration = () => {
    setStage(3);
  };

  return (
    <div
      className="content-stretch flex flex-col gap-[16px] h-[1117px] items-start relative rounded-bl-[24px] rounded-br-[24px] shrink-0 w-[864px]"
      data-node-id="2953:24568"
      data-name="05模块"
      style={stage === 5 ? { backgroundImage: "linear-gradient(180deg, rgba(236, 236, 236, 0) 0%, #ececec 100%)" } : undefined}
    >
      <PetMindPreconfiguration stage={stage} />
      <PetMindStageNavigator stage={stage} onStageChange={selectStage} />
      <PetMindStagePanel
        onAdvanceToActionOrchestration={advanceToActionOrchestration}
        onAdvanceToAiRecognition={advanceToAiRecognition}
        onAdvanceToReviewSend={advanceToReviewSend}
        recordingPlaybackRef={recordingPlaybackRef}
        stage={stage}
      />
      <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full" data-name="Quote Item Container">
        <img alt="" aria-hidden="true" className="block shrink-0 size-[24px]" draggable={false} src={ASSETS.footnote} />
        <p className="[word-break:break-word] flex-[1_0_0] font-['OPPOSans:Light',sans-serif] leading-[24px] min-w-px text-[#474747] text-[12px] tracking-[-0.24px] uppercase">
          AI 的长期记忆不是保存更多聊天记录，而是让每次服务、宠主反馈和处理结果，都结构化写回同一只宠物，成为下一次判断可追溯的上下文。
        </p>
      </div>
    </div>
  );
}

export function PetMindAssistantSection({
  sectionId,
  sectionRef,
}: {
  sectionId: string;
  sectionRef: (node: HTMLElement | null) => void;
}) {
  return (
    <section
      ref={sectionRef}
      id={`petmind-detail-section-${sectionId}`}
      className="content-stretch flex flex-col gap-[84px] items-start py-[48px] relative shrink-0 w-[864px]"
      data-node-id="2396:14596"
      data-section-id={sectionId}
      data-name="Section Container 9"
    >
      <PetMindAssistantDivider />
      <PetMindAssistantEventContext />
      <PetMindAssistantWorkflow />
    </section>
  );
}
