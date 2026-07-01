from data_loader import load_data

df = load_data()

print("=" * 60)
print("DATASET OVERVIEW")
print("=" * 60)

print("\nShape:")
print(df.shape)

print("\nData Types:")
print(df.dtypes)

print("\nStatistical Summary:")
print(df.describe())

print("\nClass Distribution:")
print(df["Class"].value_counts())

print("\nClass Percentage:")
print(df["Class"].value_counts(normalize=True) * 100)