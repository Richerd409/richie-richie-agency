import Foundation
import SwiftData

@Model
final class Account {
    var id: UUID
    var name: String
    var type: AccountType
    var balance: Decimal

    @Relationship(deleteRule: .cascade, inverse: \Transaction.account)
    var transactions: [Transaction]? = []

    init(id: UUID = UUID(), name: String, type: AccountType, balance: Decimal = 0.0) {
        self.id = id
        self.name = name
        self.type = type
        self.balance = balance
    }
}

enum AccountType: String, Codable {
    case asset
    case liability
    case equity
    case revenue
    case expense
}
