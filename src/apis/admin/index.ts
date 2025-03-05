import { getBookReviewList, acceptBookReviewList, rejectBookReviewList } from './book'
import { getWithdrawalList } from './withdrawal'
import { getReportList } from './report'
export default {
  getBookReviewList,
  getWithdrawalList,
  acceptBookReview: acceptBookReviewList,
  rejectBookReview: rejectBookReviewList,
  getReportList
}
