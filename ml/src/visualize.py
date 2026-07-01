import matplotlib.pyplot as plt
from data_loader import load_data

df = load_data()

counts = df["Class"].value_counts()

plt.figure(figsize=(6,4))

plt.bar(["Normal","Fraud"], counts)

plt.title("Transaction Distribution")

plt.xlabel("Class")

plt.ylabel("Count")

plt.show()