import SwiftUI
import SwiftData

struct ContentView: View {
    @Environment(\.modelContext) private var modelContext
    @Query private var accounts: [Account]

    var body: some View {
        NavigationStack {
            List {
                Section(header: Text("Accounts Summary")) {
                    if accounts.isEmpty {
                        Text("No accounts yet. Add one to get started.")
                            .foregroundColor(.secondary)
                    } else {
                        ForEach(accounts) { account in
                            HStack {
                                Text(account.name)
                                Spacer()
                                Text(account.balance, format: .currency(code: "USD"))
                                    .bold()
                            }
                        }
                        .onDelete(perform: deleteItems)
                    }
                }
            }
            .navigationTitle("Dashboard")
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    EditButton()
                }
                ToolbarItem {
                    Button(action: addAccount) {
                        Label("Add Account", systemImage: "plus")
                    }
                }
            }
        }
    }

    private func addAccount() {
        withAnimation {
            let newAccount = Account(name: "New Account", type: .asset, balance: 0.0)
            modelContext.insert(newAccount)
        }
    }

    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(accounts[index])
            }
        }
    }
}

#Preview {
    ContentView()
        .modelContainer(for: Account.self, inMemory: true)
}
