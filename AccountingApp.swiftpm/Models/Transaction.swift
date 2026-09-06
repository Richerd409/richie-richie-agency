import Foundation
import SwiftData

@Model
final class Transaction {
    var id: UUID
    var date: Date
    var amount: Decimal
    var notes: String
    var isIncome: Bool

    var account: Account?

    // For receipt scanning feature placeholder
    var receiptImageData: Data?

    init(id: UUID = UUID(), date: Date = Date(), amount: Decimal, notes: String, isIncome: Bool) {
        self.id = id
        self.date = date
        self.amount = amount
        self.notes = notes
        self.isIncome = isIncome
    }
}
