import Foundation
import SwiftData

@Model
final class Invoice {
    var id: UUID
    var clientName: String
    var issueDate: Date
    var dueDate: Date
    var amount: Decimal
    var isPaid: Bool
    var notes: String

    init(id: UUID = UUID(), clientName: String, issueDate: Date = Date(), dueDate: Date, amount: Decimal, isPaid: Bool = false, notes: String = "") {
        self.id = id
        self.clientName = clientName
        self.issueDate = issueDate
        self.dueDate = dueDate
        self.amount = amount
        self.isPaid = isPaid
        self.notes = notes
    }
}
